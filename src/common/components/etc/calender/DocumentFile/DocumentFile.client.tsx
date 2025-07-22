'use client';

import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { DocumentType } from '../types/calender.common.types';
import { DocumentFileProps } from './DocumentFile.types';

const DocumentFile = ({ file, onClick }: DocumentFileProps) => {
  const documentIconMap = {
    [DocumentType.AI_MEETING_MANAGER]: FeaturedFileIconsState.SIZE_16_AI_MANAGER_FILE,
    [DocumentType.SNS_EVENT_ASSISTANT]: FeaturedFileIconsState.SIZE_16_SNS_ASSISTANT_FILE,
    [DocumentType.TEAM_MOOD_TRACKER]: FeaturedFileIconsState.SIZE_16_TEAM_MOOD_FILE,
  };
  const iconState = documentIconMap[file.type];
  const handleClick = () => {
    onClick?.(file.id);
  };
  return (
    <div
      className="border-stroke-200 h-30pxr w-136pxr rounded-6pxr shadow-calendar mx-1.5 flex shrink-0 cursor-pointer items-center gap-0.5 border bg-white p-1.5 hover:bg-gray-600"
      onClick={handleClick}
    >
      {iconState && <FeaturedFileIcons state={iconState} />}
      <span className="text-bt3-sb w-105pxr pointer-events-none overflow-hidden text-ellipsis whitespace-nowrap select-none">
        {file.title}
      </span>
    </div>
  );
};

export default DocumentFile;
