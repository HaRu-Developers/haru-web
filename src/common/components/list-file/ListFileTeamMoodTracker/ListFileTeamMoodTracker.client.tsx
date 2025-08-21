'use client';

import { format } from 'date-fns';

import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import { useWorkspaceId } from '@common/hooks/useWorkspaceId';

import BaseListFile from '../BaseListFile/BaseListFile.client';
import HumanIconWithText from '../HumanIconWithText/HumanIconWithText.server';
import { ListFileTeamMoodTrackerProps } from './ListFileTeamMoodTracker.types';

const ListFileTeamMoodTracker = ({
  surveyId,
  title,
  createdAt,
  dueDate,
  respondentsNum,
  isCheckMode,
  isChecked,
  onCheckToggle,
}: ListFileTeamMoodTrackerProps) => {
  const { workspaceId } = useWorkspaceId();

  const subtitle = format(new Date(createdAt), 'yyyy년 M월 d일, h:mm a');
  const formatDueDate = format(new Date(dueDate), 'yyyy. M. d');

  const rightContent = (
    <div className="text-b3-rg gap-30pxr pr-32pxr flex items-center">
      <div className="w-90pxr flex items-center justify-center">
        {dueDate && <span className="text-b3-rg text-gray-200">{formatDueDate}</span>}
      </div>
      <div className="w-90pxr flex items-center justify-center">
        {respondentsNum !== undefined && <HumanIconWithText text={respondentsNum} />}
      </div>
    </div>
  );

  return (
    <BaseListFile
      id={surveyId}
      title={title}
      subtitle={subtitle}
      href={ROUTES.DETAIL_DOCUMENTS_DEFAULT[FileType.TEAM_MOOD_TRACKER](workspaceId, surveyId)}
      fileIconState={FeaturedFileIconsState.SIZE_24_TEAM_MOOD_FILE}
      isCheckMode={isCheckMode}
      isChecked={isChecked}
      onCheckToggle={onCheckToggle}
      rightContent={rightContent}
    />
  );
};

export default ListFileTeamMoodTracker;
