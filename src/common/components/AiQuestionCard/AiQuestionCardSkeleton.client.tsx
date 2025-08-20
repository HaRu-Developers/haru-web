'use client';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

const AiQuestionCardSkeleton = () => {
  return (
    <div className="border-stroke-200 w-110 cursor-pointer rounded-xl border px-5 pt-5 pb-4.5">
      <div className="mb-3 inline-flex items-start gap-3">
        <div className="flex-shrink-0">
          <AiQuestionIcons state={AiQuestionIconsState.SIZE_24_HOVER} />
        </div>

        <div className="gap-y-5pxr flex flex-col">
          <div className="animate-bg-pulse h-14pxr w-full rounded" />
          <div className="animate-bg-pulse w-280pxr h-14pxr rounded" />
        </div>
      </div>

      <div className="animate-bg-pulse h-26pxr w-364pxr rounded" />
    </div>
  );
};

export default AiQuestionCardSkeleton;
