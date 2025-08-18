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
  onMicStream?: (stream: MediaStream) => void; // 마이크 스트림을 UI에 전달
};

const useMeetingSocket = ({
  workspaceId,
  meetingId,
  initialTranscripts = [],
  onMicStream,
}: UseMeetingSocketParams) => {
  const { addToast } = useToastActions();
  // segmentId → 배열 인덱스 매핑
  const indexMapRef = useRef(new Map<number, number>());

  // WS URL memo
  const wsUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/${workspaceId}`,
    [workspaceId],
  );

  // 연결 상태 변수
  const isOpenOrConnecting = (ws?: WebSocket | null) =>
    !!ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING);
  const isConnectingRef = useRef(false);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const micCtlRef = useRef<MicController | null>(null);
  const { mutateAsync: endMeetingMutate, isPending: isEnding } = useEndMeetingMinutes(meetingId);

  const [speeches, setSpeeches] = useState<Speech[]>(() => initialTranscripts);

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

  // connect - Promise 써서 열림 보장까지 resolve
  const connect = useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!wsUrl) {
          console.warn('[WS] skip: wsUrl empty');
          reject(new Error('WS URL empty'));
          return;
        }
        if (isOpenOrConnecting(wsRef.current) || isConnectingRef.current) {
          console.log('[WS] already open/connecting');
          // 이미 연결돼 있으면 성공으로 간주
          resolve();
          return;
        }

        isConnectingRef.current = true;
        let ws: WebSocket | null = null;
        try {
          ws = new WebSocket(wsUrl);
        } catch (e) {
          isConnectingRef.current = false;
          console.error('[WS] new WebSocket() failed:', e);
          reject(e instanceof Error ? e : new Error('WebSocket ctor failed'));
          return;
        }

        ws.binaryType = 'arraybuffer';
        wsRef.current = ws;

        let settled = false;
        const safeResolve = () => {
          if (!settled) {
            settled = true;
            cleanup();
            resolve();
          }
        };
        const safeReject = (e?: unknown) => {
          if (!settled) {
            settled = true;
            cleanup();
            reject(e instanceof Error ? e : new Error('connect failed'));
          }
        };
        const cleanup = () => {
          try {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onerror = null;
            ws.onclose = null;
          } catch {
            void 0;
          }
        };

        ws.onopen = async () => {
          isConnectingRef.current = false;
          setConnected(true);
          console.log('[WS] open');
          try {
            // worklet + 16k 업스트림 시작
            micCtlRef.current = await startMicAndPipeToWebSocket(ws);
            const stream = micCtlRef.current?.getStream?.();
            if (stream && typeof onMicStream === 'function') onMicStream(stream);
            safeResolve();
          } catch (e) {
            console.error('[WS] mic init failed:', e);
            try {
              ws.close(1011, 'mic-init-failed');
            } catch {
              void 0;
            }
            safeReject(e);
          }
        };

        ws.onerror = (evt) => {
          console.error('[WS] onerror event:', evt);
          // 토스트 표시
          addToast({
            type: ToastType.ERROR,
            text: '음성 서버에 연결을 실패했습니다.',
          });
          // 아직 열리기 전에 error면 실패로 처리
          if (!settled) {
            isConnectingRef.current = false;
            // safeReject(new Error('WebSocket error before open'));
          }
        };

        const readyStateStr = (ws?: WebSocket | null) => {
          if (!ws) return 'NO_SOCKET';
          return (
            ['CONNECTING(0)', 'OPEN(1)', 'CLOSING(2)', 'CLOSED(3)'][ws.readyState] ??
            String(ws.readyState)
          );
        };

        const logCloseEvt = (evt: CloseEvent) => {
          // 일부 서버/프록시는 1006(Abnormal)로 떨어짐 → 거의 핸드셰이크 실패/정책 차단 케이스
          console.warn('[WS] close', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
            readyState: readyStateStr(wsRef.current),
          });
        };

        ws.onclose = async (evt) => {
          isConnectingRef.current = false;
          setConnected(false);
          console.warn('[WS] close', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
          });

          logCloseEvt(evt);
          await micCtlRef.current?.stop();
          micCtlRef.current = null;

          // open 전에 닫혔다면 실패
          if (!settled) {
            safeReject(new Error(`WebSocket closed: ${evt.code} ${evt.reason || ''}`.trim()));
          }
        };

        // 메시지 처리
        ws.onmessage = (ev) => {
          try {
            const raw = JSON.parse(ev.data as string);
            // 포맷팅
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

            // 이전거와 병합하기
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
              // 개발 시 디버그
              if (process.env.NODE_ENV !== 'production') {
                console.debug('[WS] unknown message:', raw);
              }
            }
          } catch {
            // ignore non-JSON (binary)
          }
        };
      }),
    [addToast, onMicStream, setQuestionsFor, upsertSpeech, wsUrl],
  );

  // 외부 ui에서 쓸 recording controls
  const pauseStreaming = useCallback(() => micCtlRef.current?.pause(), []);
  const resumeStreaming = useCallback(() => micCtlRef.current?.resume(), []);
  const isPaused = useCallback(() => micCtlRef.current?.isPaused() ?? false, []);

  // endMeeting (서버에 종료 요청 → 서버가 WS 닫음)
  const endMeeting = useCallback(async () => {
    try {
      await micCtlRef.current?.stop();
    } catch {
      void 0;
    }
    await endMeetingMutate({ meetingId });
    setSpeeches([]);
  }, [endMeetingMutate, meetingId]);

  // cleanup
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
