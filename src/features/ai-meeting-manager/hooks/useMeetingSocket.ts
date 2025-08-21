'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import useEndMeetingMinutes from '@api/meeting/post/mutations/useEndMeetingMinutes';

import { ToastType } from '@common/types/toast.types';

import { ROUTES } from '@common/constants/routes.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { Question, Speech, WsInbound } from '../types/meeting.types';
import { type MicController, startMicAndPipeToWebSocket } from '../utils/capture-and-send.utils';
import { ensureQuestionObjects, mergeQuestions } from '../utils/meeting-format.utils';
import { useMeetingModalActions } from './stores/useMeetingModalStore';
import useMicLevelFetching from './useLevelFetching';

/**
 * 훅 param 타입
 */
interface UseMeetingSocketParams {
  workspaceId: string;
  meetingId: string;
  initialTranscripts?: Speech[]; // 초기 발화,질문 데이터
  onMicStream?: React.Dispatch<React.SetStateAction<MediaStream | null>>; // 마이크 스트림을 UI에 전달
  sendAudio?: boolean; // 오디오 업스트림 전송 여부
}

const useMeetingSocket = ({
  workspaceId,
  meetingId,
  initialTranscripts = [],
  onMicStream,
  sendAudio = true,
}: UseMeetingSocketParams) => {
  const router = useRouter();
  const { addToast } = useToastActions();
  const { openEndMeetingModal, openMmLoadingModal, closeEndMeetingModal, closeMmLoadingModal } =
    useMeetingModalActions();

  // ===== 상태
  const [speeches, setSpeeches] = useState<Speech[]>(() => initialTranscripts);
  const [connected, setConnected] = useState(false);

  // ===== refs
  // segmentId → 배열 인덱스 매핑
  const indexMapRef = useRef(new Map<number, number>());
  const wsRef = useRef<WebSocket | null>(null);
  const micCtlRef = useRef<MicController | null>(null);
  const isConnectingRef = useRef(false);

  // 회의 종료 뮤테이션
  const { mutateAsync: endMeetingMutate, isPending: isEnding } = useEndMeetingMinutes(
    workspaceId,
    meetingId,
  );

  // ===== 유틸
  // WS URL memo
  const wsUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/${meetingId}`,
    [meetingId],
  );
  // const wsUrl = useMemo(() => `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}`, []); // 테스트용

  // 연결 상태 변수
  const isOpenOrConnecting = (ws?: WebSocket | null) =>
    !!ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING);

  // ===== 초기 transcripts 병합
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

    // confirm 모달 닫음 보장
    closeEndMeetingModal();
  }, [meetingId, initialTranscripts, closeEndMeetingModal]);

  // ===== 상태 업데이트 도우미들 - 서버 메시지 처리
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

  // 서버 메시지 파서
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

  // ===== 런타임 핸들러(오픈 후 한 번만 세팅)
  const attachRuntimeHandlers = useCallback(
    (ws: WebSocket) => {
      ws.onmessage = handleInbound;
      ws.onerror = () => {
        addToast({ type: ToastType.ERROR, text: '음성 서버 연결 중 오류가 발생했습니다.' });
      };
      ws.onclose = async (evt) => {
        setConnected(false);

        // 1) 서버에 회의 종료 요청
        try {
          // confirm 모달 닫음
          closeEndMeetingModal();
          openMmLoadingModal(); // 호출 전에 열기
          await endMeetingMutate({ meetingId });
        } catch {
          void 0;
        } finally {
          closeMmLoadingModal(); // 항상 닫기
        }

        // 2) 로컬 자원 정리
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
        wsRef.current = null;
        setSpeeches([]);

        // 회의록 화면으로 이동
        // 회의 화면으로 다시 못 가게 replace 사용
        router.replace(ROUTES.AI_MEETING_MANAGER.MINUTES(workspaceId, meetingId));

        if (process.env.NODE_ENV !== 'production') {
          console.warn('[WS] close', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
          });
        }
      };
    },
    [
      addToast,
      handleInbound,
      onMicStream,
      closeEndMeetingModal,
      endMeetingMutate,
      meetingId,
      openMmLoadingModal,
      closeMmLoadingModal,
      workspaceId,
      router,
    ],
  );

  // ===== connect - Promise 써서 열림 보장까지 resolve
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
                onMicStream(stream);
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

  // ===== 외부 ui에서 쓸 recording controls
  const pauseStreaming = useCallback(() => {
    if (!sendAudio) return;
    micCtlRef.current?.pause(); // 전송만 멈춤(트랙(ui)은 유지)
  }, [sendAudio]);

  const resumeStreaming = useCallback(async () => {
    if (!sendAudio) return;
    micCtlRef.current?.resume();
  }, [sendAudio]);

  const isPaused = useCallback(() => micCtlRef.current?.isPaused() ?? false, []);

  // ===== 음량 감지 (isFetching 설정)
  useMicLevelFetching(micCtlRef);

  // ===== 회의 종료
  // 모달 열기
  const onOpenEndMeetingModal = useCallback(async () => {
    // 커스텀 이벤트 발생시켜 GnbLeftRecoderBar랑 동기화 - ui
    window.dispatchEvent(new CustomEvent('recorder', { detail: { action: 'pause' } }));
    try {
      pauseStreaming(); // 모달 열릴 때 ws 전송 일시정지
      // endmeetingModal 열기
      openEndMeetingModal();
    } catch (e) {
      console.error(e);
    }
  }, [pauseStreaming, openEndMeetingModal]);

  // 모달에서 확인 눌렀을때
  const endMeeting = useCallback(async () => {
    // confirm 모달 닫음
    closeEndMeetingModal();

    try {
      openMmLoadingModal();
      // 서버에 종료 요청 → 서버가 WS 닫음
      await endMeetingMutate({ meetingId });
    } finally {
      closeMmLoadingModal();
    }

    try {
      wsRef.current?.close(1000, 'ended-by-user');
    } catch {
      void 0;
    }
    wsRef.current = null;

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

    setConnected(false);
    setSpeeches([]);

    // 회의록 화면으로 이동
    // 회의 화면으로 다시 못 가게 replace 사용
    router.replace(ROUTES.AI_MEETING_MANAGER.MINUTES(workspaceId, meetingId));
  }, [
    meetingId,
    endMeetingMutate,
    openMmLoadingModal,
    closeMmLoadingModal,
    closeEndMeetingModal,
    onMicStream,
    router,
    workspaceId,
  ]);

  // 모달에서 취소 눌렀을때
  const cancelEndMeeting = useCallback(async () => {
    // 커스텀 이벤트 발생시켜 GnbLeftRecoderBar랑 동기화 - ui 멈추기
    window.dispatchEvent(new CustomEvent('recorder', { detail: { action: 'resume' } }));
    resumeStreaming(); // ws 다시 전송
    closeEndMeetingModal(); // 모달 닫기
  }, [resumeStreaming, closeEndMeetingModal]);

  // ===== sendAudio가 꺼질 때 즉시 업스트림 중단 및 UI 동기화
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

  // ===== 언마운트 정리
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
    connect,
    pauseStreaming,
    resumeStreaming,
    isPaused,
    onOpenEndMeetingModal,
    endMeeting,
    cancelEndMeeting,
  };
};

export default useMeetingSocket;
