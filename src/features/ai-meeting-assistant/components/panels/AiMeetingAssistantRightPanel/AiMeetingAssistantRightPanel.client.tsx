'use client';

import {
  AiMeetingAssistantRightTabLabels,
  AiMeetingAssistantRightTabType,
} from '@features/ai-meeting-assistant/constants/tabs';

import { useTabActions, useTabInfo } from '@features/ai-meeting-assistant/hooks/stores/useTabStore';

const AiMeetingAssistantRightPanel = () => {
  const { rightTab } = useTabInfo();
  const { setRightTab } = useTabActions();

  const handleTabChange = () => {
    // TODO: 실제로는 조건에 맞춰 탭 전환 필요
    const nextTab =
      rightTab === AiMeetingAssistantRightTabType.AiQuestions
        ? AiMeetingAssistantRightTabType.AiRecommendations
        : AiMeetingAssistantRightTabType.AiQuestions;

    setRightTab(nextTab);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <p>{AiMeetingAssistantRightTabLabels[rightTab as AiMeetingAssistantRightTabType]} 내용</p>
      <button onClick={handleTabChange}>탭 전환하기</button>
    </div>
  );
};

export default AiMeetingAssistantRightPanel;
