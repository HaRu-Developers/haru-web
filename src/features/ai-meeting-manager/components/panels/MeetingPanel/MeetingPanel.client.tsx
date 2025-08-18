'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesSpeechQuestion from '@api/meeting/get/queries/useFetchMeetingMinutesSpeechQuestion';
import useFetchMeetingMinutesVoiceLink from '@api/meeting/get/queries/useFetchMeetingMinutesVoiceLink';

import parseEnum from '@common/utils/parse-enum.utils';

import GnbBottomPlayerBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomPlayerBar/GnbBottomPlayerBar.client';
import GnbBottomPlayerBarSkeleton from '@common/components/gnbs/gnb-audio-bar/GnbBottomPlayerBar/GnbBottomPlayerBarSkeleton';
import GnbBottomRecorderBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomRecorderBar/GnbBottomRecorderBar.client';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import { DEFAULT_SPEECH_QUESTION } from '@features/ai-meeting-manager/constants/speechQuestion.constants';

import useMeetingSocket from '@features/ai-meeting-manager/hooks/useMeetingSocket';

import LeftTab from '@features/ai-meeting-manager/components/LeftTab/LeftTab.client';
import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';

import { LeftTabType } from '../../LeftTab/LeftTab.types';
import { MeetingPanelProps } from './MeetingPanel.type';
import RightPanel from './RightPanel/RightPanel.client';
import SpeechPanel from './SpeechPanel/SpeechPanel.client';

const MeetingPanel = ({ pageType, leftTab }: MeetingPanelProps) => {
  const formattedLeftTab = parseEnum(leftTab, LeftTabType, LeftTabType.MEETING_PROCEEDING);
  const { workspaceId, meetingId } = useParams<{ workspaceId: string; meetingId: string }>();
  // 발화, 질문 가져오기
  const { extra: { meetingStartTime, transcripts: initialTranscripts } = DEFAULT_SPEECH_QUESTION } =
    useFetchMeetingMinutesSpeechQuestion(meetingId);
  // 음성 파일 가져오기
  const { extra: voiceLink = '', isFetching } = useFetchMeetingMinutesVoiceLink(meetingId);

  const [micStream, setMicStream] = useState<MediaStream | null>(null);

  const isMeetingPage = pageType === AiMeetingPageType.MEETING;

  // 소켓: 실시간 발화/질문 업데이트 + 오디오 청크 전송
  const {
    speeches,
    questionsForUI,
    speechTextById,
    connect,
    isEnding,
    isPaused,
    endMeeting,
    pauseStreaming,
    resumeStreaming,
  } = useMeetingSocket({
    workspaceId,
    meetingId,
    initialTranscripts,
    onMicStream: setMicStream,
    // sendAudio: false // test api 쓰기 위한 임시 설정
  });

  return (
    <section className="flex">
      <div className="relative flex flex-1 flex-col">
        <MeetingHeader />
        {isMeetingPage ? null : <LeftTab current={formattedLeftTab} />}
        <SpeechPanel pageType={pageType} meetingStartTime={meetingStartTime} speeches={speeches} />
        <div className="bottom-86pxr absolute inset-x-0 z-1 flex justify-center">
          {isMeetingPage ? (
            <GnbBottomRecorderBar
              connect={connect}
              isEnding={isEnding}
              isPaused={isPaused}
              endMeeting={endMeeting}
              pauseStreaming={pauseStreaming}
              resumeStreaming={resumeStreaming}
              micStream={micStream}
            />
          ) : isFetching ? (
            <GnbBottomPlayerBarSkeleton />
          ) : (
            <GnbBottomPlayerBar audioUrl={voiceLink} />
          )}
        </div>
      </div>
      <RightPanel questionsForUI={questionsForUI} speechTextById={speechTextById} />
    </section>
  );
};

export default MeetingPanel;
