'use client';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

import AiQuestionCard from '@common/components/AiQuestionCard/AiQuestionCard.client';
import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import { RightTabLabels } from './RightPanel.constants';
import { RightTabType } from './RightPanel.types';

const RightPanel = () => {
  const hasMeetingLog = true; // TODO: 실제로는 서버에서 가져오기
  const label = hasMeetingLog
    ? RightTabLabels[RightTabType.AI_QUESTIONS]
    : RightTabLabels[RightTabType.AI_RECOMMENDATIONS];

  return (
    <section className="border-stroke-200 flex flex-col border-l border-solid">
      <div className="border-stroke-200 py-13pxr flex h-[var(--tab-height)] shrink-0 flex-col items-start justify-center gap-2.5 border-b border-solid bg-white px-5">
        <CategoryOption label={label} active />
      </div>
      {/* 목록 부분 */}
      <div className="scrollbar-component h-[calc(100dvh-var(--tab-height))] overflow-y-auto">
        {/* 설명 부분 */}
        <div className="gap-6pxr mt-36pxr mb-32pxr flex flex-col items-center">
          <div className="gap-3pxr flex items-center">
            <AiQuestionIcons state={AiQuestionIconsState.SIZE_18} />
            <h3 className="text-t3-sb text-black">HaRu AI 추천 질문</h3>
          </div>
          <h4 className="text-b4-rg text-gray-300">회의 내용에 맞춰 질문을 추천해 드려요.</h4>
        </div>
        {/* 추천 질문 부분 */}
        {hasMeetingLog && (
          <div className="gap-12pxr px-20pxr pb-76pxr flex flex-col">
            {Array.from({ length: 20 }, (_, idx) => (
              <AiQuestionCard
                key={idx}
                aiRecommendQuestion={
                  '해당 금액에 밥값 외에 음료까지 포함되는 건가요? 아니면 순수 식사만 기준인가요?'
                }
                userAnswer={
                  '그럼 회비는 인당 25,000원으로 가정하고, 예산 구조를 항목별로 나눠봅시다.'
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RightPanel;
