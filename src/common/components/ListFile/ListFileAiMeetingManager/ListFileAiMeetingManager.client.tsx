import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import BaseListFile from '../BaseListFile/BaseListFile.client';
import { ListFileAiMeetingManagerProps } from './ListFileAiMeetingManager.types';

const ListFileAiMeetingManager = ({
  meetingId,
  title,
  updatedAt,
  isCheckMode,
  isChecked,
  onCheckToggle,
}: ListFileAiMeetingManagerProps) => {
  return (
    <BaseListFile
      id={meetingId}
      title={title}
      subtitle={updatedAt}
      href={`/meeting/${meetingId}`}
      fileIconState={FeaturedFileIconsState.SIZE_24_AI_MANAGER_FILE}
      isCheckMode={isCheckMode}
      isChecked={isChecked}
      onCheckToggle={onCheckToggle}
    />
  );
};

export default ListFileAiMeetingManager;
