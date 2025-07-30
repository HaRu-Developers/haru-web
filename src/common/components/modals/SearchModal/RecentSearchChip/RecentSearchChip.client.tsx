'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { RecentSearchChipProps } from './RecentSearchChip.types';

const RecentSearchChip = ({ text, onClose }: RecentSearchChipProps) => {
  return (
    <div className="gap-x-3pxr pl-9pxr pr-6pxr h-28pxr rounded-7pxr border-stroke-200 flex flex-row items-center justify-center border">
      <span className="text-cap1-rg text-gray-100">{text}</span>
      <button onClick={onClose}>
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} />
      </button>
    </div>
  );
};

export default RecentSearchChip;
