'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useEndMeetingMinutes from '@api/meeting/post/mutations/useEndMeetingMinutes';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { Question, Speech, WsInbound } from '../types/meeting.types';
import { type MicController, startMicAndPipeToWebSocket } from '../utils/capture-and-send.utils';
import { useSpeechQuestionActions } from './stores/useSpeechQuestionsStore';

// 문자열[] → Question[] 로 변환 + 중복 제거
let _qid = 1;
// 공백, 대소문자 정규화해 텍스트 해시 키 만듦
const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();
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

const mergeQuestions = (prev: Question[], next: Question[]) => {
  const seen = new Set(prev.map((q) => q.question));
  const merged = prev.slice();
  for (const q of next) if (!seen.has(q.question)) merged.push(q);
  return merged;
};

/**
 * 훅 param 타입
 */
type UseMeetingSocketParams = {
  workspaceId: string;
  meetingId: string;
  meetingStartTime: string;
  initialTranscripts?: Speech[]; // 초기 데이터
};

const useMeetingSocket = ({
  workspaceId,
  meetingId,
  meetingStartTime,
  initialTranscripts = [],
}: UseMeetingSocketParams) => {
  const { addToast } = useToastActions();
  // segmentId를 index로 쓰는 맵
  const indexMapRef = useRef(new Map<number, number>());

  // WS URL memo
  const wsUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/${workspaceId}`,
    [workspaceId],
  );

  // 연결 상태 변수
  const isOpenOrConnecting = (ws?: WebSocket | null) =>
    !!ws &&
    (ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING ||
      ws.readyState === WebSocket.CLOSING);
  const isConnectingRef = useRef(false);

  const [connected, setConnected] = useState(false);
  const [speeches, setSpeeches] = useState<Speech[]>(() => initialTranscripts);
  const wsRef = useRef<WebSocket | null>(null);
  const micCtlRef = useRef<MicController | null>(null);

  const { setForSpeech, clearAll } = useSpeechQuestionActions();
  const { mutateAsync: endMeetingMutate, isPending: isEnding } = useEndMeetingMinutes(meetingId);

  // 초기/리셋 시
  useEffect(() => {
    // 맵 재구성
    indexMapRef.current.clear();
    initialTranscripts.forEach((s, i) => indexMapRef.current.set(s.segmentId, i));

    // 현재 실시간 데이터 날리지 않고 병합
    setSpeeches((prev) => {
      if (!initialTranscripts?.length) return prev;
      // 이미 받은 segmentId는 유지하고, 새로 온 것만 추가
      const seen = new Set(prev.map((s) => s.segmentId));
      const merged = [...prev];
      for (const s of initialTranscripts) if (!seen.has(s.segmentId)) merged.push(s);
      return merged;
    });
  }, [meetingId, initialTranscripts]);

  // utterance upsert
  // segmentId 기준으로 배열에서 찾고, 없으면 {...next, aiQuestions: []}로 추가, 있으면 불변 업데이트로 덮어쓰기
  const upsertSpeech = useCallback((next: Omit<Speech, 'aiQuestions'>) => {
    setSpeeches((prev) => {
      const idx = indexMapRef.current.get(next.segmentId);
      if (idx == null) {
        const added = [...prev, { ...next, aiQuestions: [] }];
        indexMapRef.current.set(next.segmentId, added.length - 1);
        return added;
      }
      const copy = prev.slice();
      copy[idx] = { ...copy[idx], ...next };
      return copy;
    });
  }, []);

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
        console.log('[WS] connecting to:', wsUrl);

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
        const safeReject = (err?: unknown) => {
          if (!settled) {
            settled = true;
            cleanup();
            reject(err instanceof Error ? err : new Error(String(err ?? 'connect failed')));
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
            safeReject(new Error('WebSocket error before open'));
          }
        };

        ws.onclose = async (evt) => {
          isConnectingRef.current = false;
          setConnected(false);
          console.warn('[WS] close', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
          });
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
            const msg: WsInbound =
              raw?.type === 'utterance'
                ? {
                    type: 'utterance',
                    data: {
                      segmentId:
                        typeof raw.data.segmentId === 'number'
                          ? raw.data.segmentId
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
                        segmentId:
                          typeof raw.data.segmentId === 'number'
                            ? raw.data.segmentId
                            : Number(raw.data.speechId),
                        questions: raw.data.questions,
                      },
                    }
                  : raw;

            if (msg.type === 'utterance') {
              upsertSpeech({
                segmentId: msg.data.segmentId,
                speakerId: msg.data.speakerId,
                text: msg.data.text,
                startTime: msg.data.startTime,
              });
            } else if (msg.type === 'ai_questions') {
              const qObjs = ensureQuestionObjects(msg.data.questions);
              setQuestionsFor(msg.data.segmentId, qObjs);
              setForSpeech(
                String(msg.data.segmentId),
                qObjs.map((q) => q.question),
              );
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
    [addToast, setForSpeech, setQuestionsFor, upsertSpeech, wsUrl],
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
    clearAll();
    setSpeeches([]);
  }, [endMeetingMutate, meetingId, clearAll]);

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

  // seek helper
  const calcSeekSeconds = useCallback(
    (speechStartIso: string) => {
      const base = new Date(meetingStartTime).getTime();
      const t = new Date(speechStartIso).getTime();
      if (!Number.isFinite(base) || !Number.isFinite(t)) return 0;
      return Math.max(0, (t - base) / 1000);
    },
    [meetingStartTime],
  );

  return {
    connected,
    isEnding,
    speeches,
    connect,
    endMeeting,
    calcSeekSeconds,
    pauseStreaming,
    resumeStreaming,
    isPaused,
  };
};

export default useMeetingSocket;
