'use client';

import { format } from 'date-fns';

import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import BaseListFile from '../BaseListFile/BaseListFile.client';
import { ListFileAiMeetingManagerProps } from './ListFileAiMeetingManager.types';

const ListFileAiMeetingManager = ({
  workspaceId,
  meetingId,
  title,
  updatedAt,
  isCheckMode,
  isChecked,
  onCheckToggle,
}: ListFileAiMeetingManagerProps) => {
  // 수정 날짜 포맷팅
  const subtitle = format(new Date(updatedAt), 'yyyy년 M월 d일, h:mm a');

  return (
    <BaseListFile
      id={meetingId}
      title={title}
      subtitle={subtitle}
      href={ROUTES.AI_MEETING_MANAGER.MINUTES(workspaceId, meetingId)}
      fileIconState={FeaturedFileIconsState.SIZE_24_AI_MANAGER_FILE}
      isCheckMode={isCheckMode}
      isChecked={isChecked}
      onCheckToggle={onCheckToggle}
    />
  );
};

export default ListFileAiMeetingManager;
