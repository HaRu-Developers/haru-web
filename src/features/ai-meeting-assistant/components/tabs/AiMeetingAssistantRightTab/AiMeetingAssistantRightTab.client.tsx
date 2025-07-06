'use client';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import {
  AiMeetingAssistantRightTabLabels,
  AiMeetingAssistantRightTabType,
} from '@features/ai-meeting-assistant/constants/tabs';

import { useTabInfo } from '@features/ai-meeting-assistant/hooks/stores/useTabStore';

const AiMeetingAssistantRightTab = () => {
  const { rightTab } = useTabInfo();

  return (
    <div className="border-b-stroke-200 flex h-14 w-[480px] shrink-0 flex-col items-start justify-center gap-2.5 border-b border-solid bg-white px-5 py-[13px]">
      <CategoryOption
        label={AiMeetingAssistantRightTabLabels[rightTab as AiMeetingAssistantRightTabType]}
        active={true}
      />
    </div>
  );
};

export default AiMeetingAssistantRightTab;
