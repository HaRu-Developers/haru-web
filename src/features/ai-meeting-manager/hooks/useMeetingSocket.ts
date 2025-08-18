'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useEndMeetingMinutes from '@api/meeting/post/mutations/useEndMeetingMinutes';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { Question, Speech, UiQuestion, WsInbound } from '../types/meeting.types';
import { type MicController, startMicAndPipeToWebSocket } from '../utils/capture-and-send.utils';

let _qid = 1;
/**
 * 공백, 대소문자 정규화해 텍스트 해시 키 만듦
 */
const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();
/**
 * 문자열[] → Question[] 로 변환 + 중복 제거
 */
const ensureQuestionObjects = (qs: Array<string | Question>): Question[] => {
  const mapped = qs.map((q) => (typeof q === 'string' ? { questionId: _qid++, question: q } : q));
  const seen = new Set<string>();
  const dedup: Question[] = [];
  for (const q of mapped) {
    const key = norm(q.question);
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(q);
    }
  }
  return dedup;
};

/** 질문들 합치기 */
const mergeQuestions = (prev: Question[], next: Question[]) => {
  const seen = new Set(prev.map((q) => norm(q.question)));
  const merged = prev.slice();
  for (const q of next) {
    const key = norm(q.question);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(q);
    }
  }
  return merged;
};

/**
 * 훅 param 타입
 */
type UseMeetingSocketParams = {
  workspaceId: string;
  meetingId: string;
  initialTranscripts?: Speech[]; // 초기 발화,질문 데이터
  onMicStream?: React.Dispatch<React.SetStateAction<MediaStream | null>>; // 마이크 스트림을 UI에 전달
  sendAudio?: boolean; // 오디오 업스트림 전송 여부
};

const useMeetingSocket = ({
  workspaceId,
  meetingId,
  initialTranscripts = [],
  onMicStream,
  sendAudio = true,
}: UseMeetingSocketParams) => {
  const { addToast } = useToastActions();
  // segmentId → 배열 인덱스 매핑
  const indexMapRef = useRef(new Map<number, number>());

  // WS URL memo
  const wsUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/${meetingId}`,
    [meetingId],
  );
  // const wsUrl = useMemo(() => `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}`, []);

  // 연결 상태 변수
  const isOpenOrConnecting = (ws?: WebSocket | null) =>
    !!ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING);
  const isConnectingRef = useRef(false);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const micCtlRef = useRef<MicController | null>(null);
  const { mutateAsync: endMeetingMutate, isPending: isEnding } = useEndMeetingMinutes(
    workspaceId,
    meetingId,
  );

  const [speeches, setSpeeches] = useState<Speech[]>(() => initialTranscripts);

  // ---- 초기 transcripts 병합
  // 초기/리셋 시
  useEffect(() => {
    // 맵 재구성
    indexMapRef.current.clear();
    initialTranscripts.forEach((s, i) => indexMapRef.current.set(s.segmentId, i));

    // 현재 실시간 데이터 날리지 않고 병합
    setSpeeches((prev) => {
      if (initialTranscripts.length === 0) return prev;
      // 이미 받은 segmentId는 유지하고, 새로 온 것만 추가
      const seen = new Set(prev.map((s) => s.segmentId));
      const merged = [...prev];
      for (const s of initialTranscripts) if (!seen.has(s.segmentId)) merged.push(s);
      return merged;
    });
  }, [meetingId, initialTranscripts]);

  // ---- 상태 업데이트 도우미들
  /**
   * utterance upsert
   */
  const upsertSpeech = useCallback((next: Omit<Speech, 'aiQuestions'>) => {
    setSpeeches((prev) => {
      // segmentId 기준으로 배열에서 찾고
      const idx = indexMapRef.current.get(next.segmentId); // segmentId === speechId
      // 없으면 {...next, aiQuestions: []}로 추가
      if (idx == null) {
        const added = [...prev, { ...next, aiQuestions: [] }];
        indexMapRef.current.set(next.segmentId, added.length - 1); // 배열 인덱스니까 added.length - 1 인덱스에 추가
        return added;
      }
      // 있으면 불변 업데이트로 덮어쓰기
      const copy = prev.slice();
      copy[idx] = { ...copy[idx], ...next };
      return copy;
    });
  }, []);

  /**
   * aiQuestions 넣기
   */
  const setQuestionsFor = useCallback((segmentId: number, qObjs: Question[]) => {
    setSpeeches((prev) => {
      const idx = indexMapRef.current.get(segmentId);
      if (idx == null) return prev;
      const copy = prev.slice();
      copy[idx] = {
        ...copy[idx],
        aiQuestions: mergeQuestions(copy[idx].aiQuestions ?? [], qObjs),
      };
      return copy;
    });
  }, []);

  /**
   *  UI용 질문 리스트: [{ speechId, text }]
   */
  const questionsForUI = useMemo<UiQuestion[]>(() => {
    const out: UiQuestion[] = [];
    for (const s of speeches) {
      const qs = s.aiQuestions ?? [];
      for (const q of qs) {
        out.push({
          id: q.questionId, // ensureQuestionObjects에서 보장
          segmentId: s.segmentId,
          text: q.question,
        });
      }
    }
    return out;
  }, [speeches]);

  // segmentId -> text 매핑
  const speechTextById = useMemo<Record<number, string>>(() => {
    const m: Record<number, string> = {};
    for (const s of speeches) m[s.segmentId] = s.text ?? '추천 질문 없음';
    return m;
  }, [speeches]);

  // ---- 서버 메시지 파서(한 곳)
  const handleInbound = useCallback(
    (ev: MessageEvent) => {
      try {
        const raw = JSON.parse(ev.data as string);
        const msg: WsInbound =
          raw?.type === 'utterance'
            ? {
                type: 'utterance',
                data: {
                  speechId:
                    typeof raw.data.speechId === 'number'
                      ? raw.data.speechId
                      : Number(raw.data.speechId),
                  speakerId: raw.data.speakerId,
                  text: raw.data.text,
                  startTime: raw.data.startTime,
                },
              }
            : raw?.type === 'ai_questions'
              ? {
                  type: 'ai_questions',
                  data: {
                    speechId:
                      typeof raw.data.speechId === 'number'
                        ? raw.data.speechId
                        : Number(raw.data.speechId),
                    questions: raw.data.questions,
                  },
                }
              : raw;

        if (msg.type === 'utterance') {
          upsertSpeech({
            segmentId: msg.data.speechId,
            speakerId: msg.data.speakerId,
            text: msg.data.text,
            startTime: msg.data.startTime,
          });
        } else if (msg.type === 'ai_questions') {
          const qObjs = ensureQuestionObjects(msg.data.questions);
          setQuestionsFor(msg.data.speechId, qObjs);
        } else {
          if (process.env.NODE_ENV !== 'production') console.debug('[WS] unknown message:', raw);
        }
      } catch {
        // json이 아닌 바이너리 등은 무시
      }
    },
    [setQuestionsFor, upsertSpeech],
  );

  // ---- 운영 핸들러(오픈 후 한 번만 세팅)
  const attachRuntimeHandlers = useCallback(
    (ws: WebSocket) => {
      ws.onmessage = handleInbound;
      ws.onerror = () => {
        addToast({ type: ToastType.ERROR, text: '음성 서버 연결 중 오류가 발생했습니다.' });
      };
      ws.onclose = async (evt) => {
        setConnected(false);
        try {
          await micCtlRef.current?.stop();
        } catch {
          void 0;
        }
        micCtlRef.current = null;
        try {
          onMicStream?.(null);
        } catch {
          void 0;
        }
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[WS] close', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
          });
        }
      };
    },
    [addToast, handleInbound, onMicStream],
  );

  // connect - Promise 써서 열림 보장까지 resolve
  const connect = useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!wsUrl) return reject(new Error('WS URL empty'));

        if (isOpenOrConnecting(wsRef.current) || isConnectingRef.current) {
          console.log('[WS] already open/connecting');
          // 이미 연결돼 있으면 성공으로 간주
          return resolve();
        }

        isConnectingRef.current = true;
        let ws: WebSocket | null = null;
        try {
          ws = new WebSocket(wsUrl);
        } catch (e) {
          isConnectingRef.current = false;
          return reject(e instanceof Error ? e : new Error('WebSocket ctor failed'));
        }

        ws.binaryType = 'arraybuffer';
        wsRef.current = ws;
        let hasOpened = false;

        const handleOpenOnce = async () => {
          hasOpened = true;
          isConnectingRef.current = false;
          setConnected(true);
          attachRuntimeHandlers(ws); // 운영 핸들러는 여기에서 설치
          try {
            if (sendAudio) {
              // worklet + 16k 업스트림 시작
              micCtlRef.current = await startMicAndPipeToWebSocket(ws);
              const stream = micCtlRef.current?.getStream?.();
              if (stream && onMicStream) {
                // 라이브 있으면
                const isLive = () => stream.getTracks().some((t) => t.readyState === 'live');
                if (isLive()) onMicStream(stream);
                else {
                  const [track] = stream.getAudioTracks();
                  if (track) {
                    const onUnmute = () => {
                      if (isLive()) onMicStream(stream);
                      track.removeEventListener('unmute', onUnmute);
                    };
                    track.addEventListener('unmute', onUnmute, { once: true });
                  }
                }
                // ended 감지 → UI에 알림(null)
                for (const t of stream.getTracks()) {
                  const onEnded = () => {
                    try {
                      onMicStream(null);
                    } catch {
                      void 0;
                    }
                    t.removeEventListener('ended', onEnded);
                  };
                  t.addEventListener('ended', onEnded);
                }
              }
            }
            resolve();
          } catch (e) {
            try {
              ws.close(1011, 'mic-init-failed');
            } catch {
              void 0;
            }
            reject(e instanceof Error ? e : new Error('mic init failed'));
          }
        };

        const handleErrorOnce = () => {
          // open 전에만 실패 처리
          if (!hasOpened) {
            isConnectingRef.current = false;
            reject(new Error('WebSocket error before open'));
          }
        };

        const handleCloseBeforeOpenOnce = (evt: CloseEvent) => {
          if (!hasOpened) {
            isConnectingRef.current = false;
            reject(new Error(`WebSocket closed before open: ${evt.code}`));
          }
        };

        ws.addEventListener('open', handleOpenOnce, { once: true });
        ws.addEventListener('error', handleErrorOnce, { once: true });
        ws.addEventListener('close', handleCloseBeforeOpenOnce, { once: true });
      }),
    [attachRuntimeHandlers, onMicStream, sendAudio, wsUrl],
  );

  // --- 외부 ui에서 쓸 recording controls
  const pauseStreaming = useCallback(() => {
    if (!sendAudio) return;
    micCtlRef.current?.pause();
  }, [sendAudio]);
  const resumeStreaming = useCallback(async () => {
    if (!sendAudio) return;
    const ws = wsRef.current;
    // WS 미오픈이면 그냥 리턴(외부에서 connect 먼저 호출하도록 유지)
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    const current = micCtlRef.current;
    const stream = current?.getStream?.();
    const isLive = !!stream && stream.getTracks().some((t) => t.readyState === 'live');
    if (!current || !isLive) {
      // 마이크가 죽었으면 파이프라인 재시작
      try {
        await current?.stop();
      } catch {
        void 0;
      }
      micCtlRef.current = await startMicAndPipeToWebSocket(ws);
      const newStream = micCtlRef.current?.getStream?.();
      if (newStream && onMicStream) onMicStream(newStream);
      return;
    }
    current.resume();
  }, [onMicStream, sendAudio]);
  const isPaused = useCallback(() => micCtlRef.current?.isPaused() ?? false, []);

  // ---- 회의 종료
  const endMeeting = useCallback(async () => {
    try {
      await micCtlRef.current?.stop();
    } catch {
      void 0;
    }
    // 서버에 종료 요청 → 서버가 WS 닫음
    await endMeetingMutate({ meetingId });

    // 클라에서 WS도 정리(서버가 닫는다면 중복 close여도 안전)
    try {
      wsRef.current?.close(1000, 'client-end');
    } catch {
      void 0;
    }
    wsRef.current = null;

    setConnected(false);
    setSpeeches([]);
  }, [endMeetingMutate, meetingId]);

  // ---- sendAudio가 꺼질 때 즉시 업스트림 중단 및 UI 동기화
  useEffect(() => {
    if (!sendAudio && micCtlRef.current) {
      (async () => {
        try {
          await micCtlRef.current?.stop();
        } catch {
          void 0;
        }
        micCtlRef.current = null;
        try {
          onMicStream?.(null);
        } catch {
          void 0;
        }
      })();
    }
  }, [onMicStream, sendAudio]);

  // ---- 언마운트 정리
  useEffect(() => {
    return () => {
      try {
        wsRef.current?.close();
      } catch {
        void 0;
      }
      wsRef.current = null;
      try {
        micCtlRef.current?.stop();
      } catch {
        void 0;
      }
      micCtlRef.current = null;
    };
  }, []);

  return {
    connected,
    isEnding,
    speeches,
    questionsForUI, // RightPanel 전용
    speechTextById, // RightPanel 전용
    connect,
    endMeeting,
    pauseStreaming,
    resumeStreaming,
    isPaused,
  };
};

export default useMeetingSocket;
