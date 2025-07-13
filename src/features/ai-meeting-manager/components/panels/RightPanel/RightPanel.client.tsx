'use client';

import { RightTabLabels, RightTabType } from '@features/ai-meeting-manager/constants/tabs';

import { useTabActions, useTabInfo } from '@features/ai-meeting-manager/hooks/stores/useTabStore';

const RightPanel = () => {
  const { rightTab } = useTabInfo();
  const { setRightTab } = useTabActions();

  const handleTabChange = () => {
    // TODO: 실제로는 조건에 맞춰 탭 전환 필요
    const nextTab =
      rightTab === RightTabType.AI_QUESTIONS
        ? RightTabType.AI_RECOMMENDATIONS
        : RightTabType.AI_QUESTIONS;

    setRightTab(nextTab);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <p>{RightTabLabels[rightTab as RightTabType]} 내용</p>
      <button onClick={handleTabChange}>탭 전환하기</button>
    </div>
  );
};

export default RightPanel;
