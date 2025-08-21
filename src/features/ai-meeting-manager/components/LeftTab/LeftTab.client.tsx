'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useParams, useRouter } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';
import useFetchMeetingMinutesSpeechQuestion from '@api/meeting/get/queries/useFetchMeetingMinutesSpeechQuestion';

import { ROUTES } from '@common/constants/routes.constants';

import useCopyToClipboard from '@common/hooks/useCopyToClipboard';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton.client';
import EditCompleteButton from '@buttons/30px/EditCompleteButton/EditCompleteButton.client';
import IconButton from '@buttons/IconButton/IconButton.client';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import { DEFAULT_SPEECH_QUESTION } from '@features/ai-meeting-manager/constants/speechQuestion.constants';

import formattingVoiceLog from '@features/ai-meeting-manager/utils/formatting-voice-log.utils';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import { LeftTabLabels } from './LeftTab.constants';
import { LeftTabProps, LeftTabType } from './LeftTab.types';

const tabs = Object.values(LeftTabType);

const LeftTab = ({ current }: LeftTabProps) => {
  const { workspaceId, meetingId } = useParams<{ workspaceId: string; meetingId: string }>();
  const router = useRouter();

  // 발화 가져오기
  const { extra: { transcripts } = DEFAULT_SPEECH_QUESTION, isFetching: isSpeechFetching } =
    useFetchMeetingMinutesSpeechQuestion(meetingId);
  // 회의 진행 내용 가져오기
  const { extra: meetingMinutesDetail, isFetching: isProceedingFetching } =
    useFetchMeetingMinutesDetail(meetingId);
  const proceeding = meetingMinutesDetail?.proceeding ?? '';

  const { editing } = useEditInfo();
  const { setEditing, requestCommit, resetEditing } = useEditActions();

  const pathname = usePathname() ?? '';
  const copyToClipboard = useCopyToClipboard();

  const handleEditClick = () => {
    setEditing(EditorType.TITLE, true);
    setEditing(EditorType.PROCEEDING, true);
  };

  const handleEditDoneClick = () => {
    // 여기선 저장을 ‘요청’만
    // 실제 저장은 MeetingHeader의 InputFileTitle, ProceedingPanel이 수행
    requestCommit();
  };

  const handleCopyClick = async (tab: LeftTabType) => {
    if (tab === LeftTabType.MEETING_VOICE_LOG)
      await copyToClipboard('음성 기록', formattingVoiceLog(transcripts));
    else if (tab === LeftTabType.MEETING_PROCEEDING) copyToClipboard('회의록', proceeding);
  };

  return (
    <div className="border-stroke-200 px-33pxr flex h-[var(--tab-height)] w-full shrink-0 items-center justify-between border-b border-solid bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr inline-flex items-center">
        {tabs.map((tab) => {
          const params = new URLSearchParams();
          params.set('leftTab', tab); // 현재 탭 값 설정
          const isActive = current === tab;

          return (
            <Link
              key={tab}
              href={`${pathname}?${params.toString()}`}
              onClick={() => {
                if (!isActive) resetEditing();
              }}
              passHref
            >
              <CategoryOption label={LeftTabLabels[tab as LeftTabType]} active={isActive} />
            </Link>
          );
        })}
      </div>

      {/* 버튼 영역 */}
      <div className="gap-12pxr inline-flex items-center">
        {current === LeftTabType.MEETING_PROCEEDING &&
          (editing[EditorType.TITLE] || editing[EditorType.PROCEEDING] ? (
            <EditCompleteButton onClick={handleEditDoneClick} />
          ) : (
            <>
              <div className="inline-flex">
                <IconButton onClick={handleEditClick} ariaLabel="회의록 수정">
                  <FeatureTabIcons state={FeatureTabIconsState.EDIT} />
                </IconButton>
                <IconButton
                  onClick={() => handleCopyClick(current)}
                  ariaLabel={`${LeftTabLabels[current]} 복사`}
                  disabled={isSpeechFetching}
                >
                  <FeatureTabIcons state={FeatureTabIconsState.COPY} />
                </IconButton>
              </div>
              <DownloadButton
                onClick={() =>
                  router.push(ROUTES.MODAL.AI_MEETING_MANAGER.DOWNLOAD(workspaceId, meetingId))
                }
              />
            </>
          ))}
        {current === LeftTabType.MEETING_VOICE_LOG && (
          <IconButton
            onClick={() => handleCopyClick(current)}
            ariaLabel={`${LeftTabLabels[current]} 복사`}
            disabled={isProceedingFetching}
          >
            <FeatureTabIcons state={FeatureTabIconsState.COPY} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default LeftTab;
