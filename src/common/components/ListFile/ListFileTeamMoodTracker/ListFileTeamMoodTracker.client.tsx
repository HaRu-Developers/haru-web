'use client';

import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

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
  const rightContent = (
    <div className="text-b3-rg flex items-center gap-x-20">
      {dueDate && <span className="text-b3-rg text-gray-200">{dueDate}</span>}
      {respondentsNum !== undefined && (
        <HumanIconWithText text={respondentsNum} className="mr-13" />
      )}
    </div>
  );

  return (
    <BaseListFile
      id={surveyId}
      title={title}
      subtitle={createdAt}
      href={`/meeting/${surveyId}`}
      fileIconState={FeaturedFileIconsState.SIZE_24_TEAM_MOOD_FILE}
      isCheckMode={isCheckMode}
      isChecked={isChecked}
      onCheckToggle={onCheckToggle}
      rightContent={rightContent}
    />
  );
};

export default ListFileTeamMoodTracker;
