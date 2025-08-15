'use client';

import { useEffect, useRef } from 'react';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

import { useFocusMapActions } from '@features/ai-meeting-manager/hooks/stores/useFocusMapStore';

import { AiQuestionCardProps } from './AiQuestionCard.types';

const AiQuestionCard = ({ aiRecommendQuestion, userAnswer, speechId }: AiQuestionCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerQuestionRef, unregisterQuestionRef, focusSpeech } = useFocusMapActions();

  useEffect(() => {
    registerQuestionRef(speechId, ref.current);
    return () => unregisterQuestionRef(speechId, ref.current as HTMLDivElement);
  }, [speechId, registerQuestionRef, unregisterQuestionRef]);
  return (
    <div
      ref={ref}
      onClick={() => focusSpeech(speechId, { flashMs: 1200 })}
      data-speech-id={speechId}
      className="border-stroke-200 w-110 cursor-pointer rounded-xl border bg-white px-5 pt-5 pb-4.5 hover:bg-gray-600"
    >
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
