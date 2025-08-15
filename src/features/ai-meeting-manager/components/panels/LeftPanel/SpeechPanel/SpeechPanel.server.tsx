'use client';

import { useCallback, useState } from 'react';

import { useParams } from 'next/navigation';

import clsx from 'clsx';

import useFetchMeetingMinutesSpeechQuestion from '@api/meeting/get/queries/useFetchMeetingMinutesSpeechQuestion';

import GnbBottomRecorderBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomRecorderBar/GnbBottomRecorderBar.client';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import { DEFAULT_SPEECH_QUESTION } from '@features/ai-meeting-manager/constants/speechQuestion.constants';

import useMeetingSocket from '@features/ai-meeting-manager/hooks/useMeetingSocket';

import { mockData } from '@features/ai-meeting-manager/data/speechQuestionMock';

import SpeechItem from './SpeechItem/SpeechItem.client';
import { SpeechPanelProps } from './SpeechPanel.types';

const SpeechPanel = ({ page }: SpeechPanelProps) => {
  const { meetingId, workspaceId } = useParams<{ meetingId: string; workspaceId: string }>();
  const { extra: { meetingStartTime, transcripts } = DEFAULT_SPEECH_QUESTION } =
    useFetchMeetingMinutesSpeechQuestion(meetingId);
  const isMeetingPage = page === AiMeetingPageType.MEETING;

  // const {
  //   speeches,
  //   connect,
  //   endMeeting,
  //   pauseStreaming,
  //   resumeStreaming,
  //   isPaused,
  //   calcSeekSeconds,
  // } = useMeetingSocket({
  //   workspaceId,
  //   meetingId,
  //   meetingStartTime,
  //   initialTranscripts: transcripts,
  // });

  // const [hasStarted, setHasStarted] = useState(false);
  // const [isRec, setIsRec] = useState(false);
  // const [elapsed, setElapsed] = useState(0);

  // const handleStart = async () => {
  //   await connect(); // WS 연결 + AudioWorklet 시작
  //   setHasStarted(true);
  //   setIsRec(true);
  // };

  // const handlePauseResume = () => {
  //   if (isPaused()) {
  //     resumeStreaming();
  //     setIsRec(true);
  //   } else {
  //     pauseStreaming();
  //     setIsRec(false);
  //   }
  // };

  // const handleStop = async () => {
  //   await endMeeting(); // 서버 종료 API 호출(WS는 서버가 닫음)
  //   setIsRec(false);
  //   setHasStarted(false);
  //   setElapsed(0);
  // };

  // mock only
  const speeches = mockData.transcripts;
  const calcSeekSeconds = useCallback((speechStartIso: string) => {
    const base = new Date(mockData.meetingStartTime).getTime();
    const t = new Date(speechStartIso).getTime();
    if (!Number.isFinite(base) || !Number.isFinite(t)) return 0;
    return Math.max(0, (t - base) / 1000);
  }, []);

  // 녹음바는 모양만 (동작 스텁)
  const [hasStarted, setHasStarted] = useState(false);
  const [isRec, setIsRec] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const handleStart = async () => {
    setHasStarted(true);
    setIsRec(true);
  };
  const handlePauseResume = () => setIsRec((v) => !v);
  const handleStop = async () => {
    setIsRec(false);
    setHasStarted(false);
    setElapsed(0);
  };

  return (
    <div
      className={clsx(
        'pr-26pxr pb-80pxr scrollbar-component relative overflow-y-auto',
        isMeetingPage
          ? 'pt-20pxr h-[calc(100dvh-var(--gnb-top-height)-var(--meeting-header-height))]'
          : 'pt-10pxr h-[calc(100dvh-var(--gnb-top-height)-var(--meeting-header-height)-var(--tab-height))]',
      )}
    >
      {speeches.map((sp) => (
        <SpeechItem
          key={sp.segmentId}
          speechId={String(sp.segmentId)}
          text={sp.text}
          speakerId={sp.speakerId}
          hasQuestion={(sp.aiQuestions?.length ?? 0) > 0}
          questions={sp.aiQuestions}
          startTime={sp.startTime}
          calcSeekSeconds={calcSeekSeconds}
        />
      ))}

      <div className="bottom-16pxr absolute inset-x-0 z-1 flex justify-center">
        <GnbBottomRecorderBar
          onRecordEnd={() => {
            /* WS 모드에선 불필요 */
          }}
          external={{
            hasStarted,
            isRecording: isRec,
            onStart: handleStart,
            onPauseResume: handlePauseResume,
            onStop: handleStop,
            elapsedSec: elapsed,
          }}
        />
      </div>
    </div>
  );
};

export default SpeechPanel;
