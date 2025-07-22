'use client';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

import AiQuestionCard from '@common/components/AiQuestionCard/AiQuestionCard.client';
import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import { RightTabLabels, RightTabType } from '@features/ai-meeting-manager/constants/tabs';

const RightPanel = () => {
  const hasMeetingLog = true; // 실제로는 서버에서 가져오기
  const label = hasMeetingLog
    ? RightTabLabels[RightTabType.AI_QUESTIONS]
    : RightTabLabels[RightTabType.AI_RECOMMENDATIONS];

  return (
    <>
      <div className="border-stroke-200 w-480pxr py-13pxr flex h-14 shrink-0 flex-col items-start justify-center gap-2.5 border-b border-solid bg-white px-5">
        <CategoryOption label={label} active />
      </div>
      <div className="gap-6pxr mt-36pxr mb-32pxr flex flex-col items-center">
        <div className="gap-3pxr flex items-center">
          <AiQuestionIcons state={AiQuestionIconsState.SIZE_18} />
          <h3>HaRu AI 추천 질문</h3>
        </div>
        <h4>회의 내용에 맞춰 질문을 추천해 드려요.</h4>
      </div>
      <div className="gap-12pxr px-20pxr flex flex-col items-start">
        <AiQuestionCard
          aiRecommendQuestion={
            '해당 금액에 밥값 외에 음료까지 포함되는 건가요? 아니면 순수 식사만 기준인가요?'
          }
          userAnswer={'그럼 회비는 인당 25,000원으로 가정하고, 예산 구조를 항목별로 나눠봅시다.'}
        />
      </div>
    </>
  );
};

export default RightPanel;
