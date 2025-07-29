'use client';

import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import BaseListFile from '../BaseListFile/BaseListFile.client';
import HumanIconWithText from '../HumanIconWithText/HumanIconWithText.server';
import { ListFileSnsEventAssistantProps } from './ListFileSnsEventAssistant.types';

const ListFileSnsEventAssistant = ({
  snsEventId,
  title,
  updatedAt,
  participantCount,
  winnerCount,
  isCheckMode,
  isChecked,
  onCheckToggle,
}: ListFileSnsEventAssistantProps) => {
  const rightContent = (
    <div className="gap-30pxr pr-32pxr flex items-center">
      <div className="w-90pxr flex items-center justify-center">
        {participantCount !== undefined && <HumanIconWithText text={participantCount} />}
      </div>
      <div className="w-90pxr flex items-center justify-center">
        {winnerCount !== undefined && <HumanIconWithText text={winnerCount} />}
      </div>
    </div>
  );

  return (
    <BaseListFile
      id={snsEventId}
      title={title}
      subtitle={updatedAt}
      href={`/meeting/${snsEventId}`}
      fileIconState={FeaturedFileIconsState.SIZE_24_SNS_ASSISTANT_FILE}
      isCheckMode={isCheckMode}
      isChecked={isChecked}
      onCheckToggle={onCheckToggle}
      rightContent={rightContent}
    />
  );
};

export default ListFileSnsEventAssistant;
