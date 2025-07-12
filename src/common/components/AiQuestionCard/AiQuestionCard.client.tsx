'use client';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

import { AiQuestionCardProps } from './AiQuestionCard.types';

const AiQuestionCard = ({ aiRecommendQuestion, userAnswer }: AiQuestionCardProps) => {
  return (
    <div className="border-stroke-200 w-110 rounded-xl border bg-white px-5 pt-5 pb-4.5 hover:bg-gray-600">
      <div className="mb-3 inline-flex items-start gap-3">
        <div className="flex-shrink-0">
          <AiQuestionIcons state={AiQuestionIconsState.SIZE_24_HOVER} />
        </div>

        <div className="text-t6-sb text-black">{aiRecommendQuestion}</div>
      </div>

      <div className="text-cap2-rg rounded-3pxr py-5pxr ml-9 overflow-hidden bg-gray-600 px-2 text-ellipsis whitespace-nowrap text-gray-200">
        {userAnswer}
      </div>
    </div>
  );
};

export default AiQuestionCard;
