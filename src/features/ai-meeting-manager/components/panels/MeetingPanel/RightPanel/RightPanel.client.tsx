'use client';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

import AiQuestionCard from '@common/components/AiQuestionCard/AiQuestionCard.client';
import AiQuestionCardSkeleton from '@common/components/AiQuestionCard/AiQuestionCardSkeleton.client';
import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import { UiQuestion } from '@features/ai-meeting-manager/types/meeting.types';

import { useSpeechQuestionInfo } from '@features/ai-meeting-manager/hooks/stores/useSpeechQuestionStore';

import { RightTabLabels } from './RightPanel.constants';
import { RightTabType } from './RightPanel.types';

const RightPanel = ({
  questionsForUI,
  speechTextById,
}: {
  questionsForUI: UiQuestion[];
  speechTextById: Record<number, string>;
}) => {
  // console.log({
  //   questionsForUI,
  //   speechTextById,
  // });
  const { isFetching } = useSpeechQuestionInfo();
  const hasRecommandQuestion = questionsForUI.length > 0;

  const label = hasRecommandQuestion
    ? RightTabLabels[RightTabType.AI_QUESTIONS]
    : RightTabLabels[RightTabType.AI_RECOMMENDATIONS];

  return (
    <section className="w-480pxr border-stroke-200 flex flex-col border-l border-solid">
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
        {hasRecommandQuestion && (
          <div className="gap-12pxr px-20pxr pb-76pxr flex flex-col">
            {questionsForUI.map((q) => (
              <AiQuestionCard
                key={q.id}
                segmentId={q.segmentId}
                aiRecommendQuestion={q.text}
                userAnswer={speechTextById[q.segmentId]}
              />
            ))}
          </div>
        )}
        {isFetching && <AiQuestionCardSkeleton />}
      </div>
    </section>
  );
};

export default RightPanel;
