'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import useFetchMeetingMinutesSpeechQuestion from '@api/meeting/get/queries/useFetchMeetingMinutesSpeechQuestion';
import useFetchMeetingMinutesVoiceLink from '@api/meeting/get/queries/useFetchMeetingMinutesVoiceLink';

import { ROUTES } from '@common/constants/routes.constants';

import parseEnum from '@common/utils/parse-enum.utils';

import GnbBottomPlayerBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomPlayerBar/GnbBottomPlayerBar.client';
import GnbBottomPlayerBarSkeleton from '@common/components/gnbs/gnb-audio-bar/GnbBottomPlayerBar/GnbBottomPlayerBarSkeleton';
import GnbBottomRecorderBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomRecorderBar/GnbBottomRecorderBar.client';
import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import LoadingModal from '@common/components/modals/LoadingModal/LoadingModal.client';
import { LoadingModalType } from '@common/components/modals/LoadingModal/LoadingModal.types';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import { DEFAULT_SPEECH_QUESTION } from '@features/ai-meeting-manager/constants/speechQuestion.constants';

import {
  selectQuestionsForUI,
  selectSpeechTextById,
} from '@features/ai-meeting-manager/utils/meeting-format.utils';

import {
  useMeetingModalActions,
  useMeetingModalInfo,
} from '@features/ai-meeting-manager/hooks/stores/useMeetingModalStore';
import useMeetingSocket from '@features/ai-meeting-manager/hooks/useMeetingSocket';

import LeftTab from '@features/ai-meeting-manager/components/LeftTab/LeftTab.client';
import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';

import EndRecordingModal from '@/common/components/modals/EndRecordingModal/EndRecordingModal.client';

import { LeftTabType } from '../../LeftTab/LeftTab.types';
import { MeetingPanelProps } from './MeetingPanel.type';
import RightPanel from './RightPanel/RightPanel.client';
import SpeechPanel from './SpeechPanel/SpeechPanel.client';

const MeetingPanel = ({ pageType, leftTab }: MeetingPanelProps) => {
  const formattedLeftTab = parseEnum(leftTab, LeftTabType, LeftTabType.MEETING_PROCEEDING);
  const { isOpenEndMeetingModal, isOpenMmLoadingModal } = useMeetingModalInfo();
  const { closeMmLoadingModal, openEndMeetingModal } = useMeetingModalActions();

  const isMeetingPage = pageType === AiMeetingPageType.MEETING;
  const isMinutesPage = pageType === AiMeetingPageType.MINUTES;

  const router = useRouter();

  const { workspaceId, meetingId } = useParams<{ workspaceId: string; meetingId: string }>();
  // 발화, 질문 가져오기
  const { extra: { meetingStartTime, transcripts: initialTranscripts } = DEFAULT_SPEECH_QUESTION } =
    useFetchMeetingMinutesSpeechQuestion(meetingId);
  // 음성 파일 가져오기 - minutesPage 에서만
  const { extra: voiceLink = '', isFetching } = useFetchMeetingMinutesVoiceLink(meetingId, {
    enabled: isMinutesPage,
  });

  const [micStream, setMicStream] = useState<MediaStream | null>(null);

  // 소켓: 실시간 발화/질문 업데이트 + 오디오 청크 전송
  const {
    speeches,
    connect,
    isPaused,
    endMeeting,
    onOpenEndMeetingModal,
    cancelEndMeeting,
    isEnding,
    pauseStreaming,
    resumeStreaming,
  } = useMeetingSocket({
    workspaceId,
    meetingId,
    initialTranscripts,
    onMicStream: setMicStream,
    // sendAudio: false // test api 쓰기 위한 임시 설정
  });

  const questionsForUI = selectQuestionsForUI(speeches);
  const speechTextById = selectSpeechTextById(speeches);

  // 이미 진행된 회의인데 /meeting에 접근하면
  const alreadyDidMeeting =
    isMeetingPage && (!!meetingStartTime || (initialTranscripts.length ?? 0) > 0);

  useEffect(() => {
    // 진행된 회의의 미팅 페이지 접근 금지 → 회의록 페이지로 이동
    if (alreadyDidMeeting) {
      router.replace(ROUTES.AI_MEETING_MANAGER.MINUTES(workspaceId, meetingId));
    }
  }, [alreadyDidMeeting, router, workspaceId, meetingId]);

  if (alreadyDidMeeting)
    return (
      <p className="p-40pxr text-t3-sb text-gray-300">
        진행 완료된 회의라 회의록 페이지로 이동합니다...
      </p>
    );
  const handleCloseLoadingModal = () => {
    closeMmLoadingModal();
    // 선택 - 닫으면서 EndMeetingModal 다시 열기
    openEndMeetingModal();
  };

  return (
    <>
      <section className="flex">
        <div className="flex flex-1 flex-col">
          <MeetingHeader />
          {isMeetingPage ? null : <LeftTab current={formattedLeftTab} />}
          <div className="relative">
            <SpeechPanel
              isMeetingPage={isMeetingPage}
              meetingStartTime={meetingStartTime}
              speeches={speeches}
            />
            <div className="bottom-16pxr absolute inset-x-0 z-1 flex justify-center">
              {isMeetingPage ? (
                <GnbBottomRecorderBar
                  connect={connect}
                  isEnding={isEnding}
                  isPaused={isPaused}
                  onOpenEndMeetingModal={onOpenEndMeetingModal} // 모달 열기
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
        </div>
        <RightPanel
          isMeetingPage={isMeetingPage}
          questionsForUI={questionsForUI}
          speechTextById={speechTextById}
        />
      </section>
      {(isOpenEndMeetingModal || isOpenMmLoadingModal) && (
        <ModalLayout canClickDimmed={false}>
          {isOpenEndMeetingModal && (
            <EndRecordingModal
              onProceed={endMeeting}
              onAbort={cancelEndMeeting}
              onClose={cancelEndMeeting}
            />
          )}
          {isOpenMmLoadingModal && (
            <LoadingModal
              onClose={handleCloseLoadingModal}
              modalType={LoadingModalType.MEETING_MINUTES}
            />
          )}
        </ModalLayout>
      )}
    </>
  );
};

export default MeetingPanel;
