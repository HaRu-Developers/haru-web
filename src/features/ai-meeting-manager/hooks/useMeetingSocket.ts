// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';

// import { useEndMeetingMutation } from '@/api/meetings/endMeeting.mutation';
// import { MicStopper, startMicAndPipeToWebSocket } from '@/lib/audio/captureAndSend';
// import type { MeetingInfo, WsInbound } from '@/types/meeting';

// import { useSpeechQuestionActions } from './stores/useSpeechQuestionsStore';

// type Options = { wsUrl: string; meeting: MeetingInfo };

// export function useMeetingSocket({ wsUrl, meeting }: Options) {
//   const [connected, setConnected] = useState(false);
//   const [utterances, setUtterances] = useState<WsInbound['data'][]>([]);
//   const wsRef = useRef<WebSocket | null>(null);
//   const stopMicRef = useRef<MicStopper | null>(null);

//   const { setForSpeech, clearAllQuestions } = useSpeechQuestionActions();

//   const { mutateAsync: endMeetingMutate, isPending: isEnding } = useEndMeetingMutation(meeting.id);

//   const connect = useCallback(async () => {
//     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

//     const ws = new WebSocket(wsUrl);
//     ws.binaryType = 'arraybuffer';
//     wsRef.current = ws;

//     ws.onopen = async () => {
//       setConnected(true);
//       stopMicRef.current = await startMicAndPipeToWebSocket(ws);
//     };

//     ws.onmessage = (ev) => {
//       try {
//         const msg = JSON.parse(ev.data as string) as WsInbound;
//         if (msg.type === 'utterance') {
//           setUtterances((prev) => [...prev, msg.data]);
//         } else if (msg.type === 'ai_questions') {
//           // 서버 스펙: 해당 speechId의 질문 "목록" → 교체가 자연스러움
//           setForSpeech(msg.data.speechId, msg.data.questions);
//         }
//       } catch {
//         // 바이너리는 업스트림 전용
//       }
//     };

//     ws.onclose = async () => {
//       setConnected(false);
//       await stopMicRef.current?.();
//     };
//   }, [wsUrl, setForSpeech]);

//   const endMeeting = useCallback(async () => {
//     await endMeetingMutate();
//     // 서버가 WS를 닫으면 onclose에서 정리됨
//     // 회의 종료 후 질문/발화 초기화가 필요하면 아래처럼:
//     // clearAllQuestions();
//     // setUtterances([]);
//   }, [endMeetingMutate /*, clearAllQuestions */]);

//   useEffect(() => {
//     return () => {
//       try {
//         wsRef.current?.close();
//       } catch {}
//     };
//   }, []);

//   const calcSeekSeconds = useCallback(
//     (utterStartIso: string) => {
//       const base = new Date(meeting.startTime).getTime();
//       const t = new Date(utterStartIso).getTime();
//       return Math.max(0, (t - base) / 1000);
//     },
//     [meeting.startTime],
//   );

//   return {
//     connected,
//     isEnding,
//     utterances,
//     connect,
//     endMeeting,
//     calcSeekSeconds,
//   };
// }
