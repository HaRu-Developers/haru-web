'use client';

import {
  AiMeetingAssistantRightTabLabels,
  AiMeetingAssistantRightTabType,
} from '@features/ai-meeting-assistant/constants/tabs';

import { useTabInfo } from '@features/ai-meeting-assistant/hooks/stores/useTabStore';

const AiMeetingAssistantLeftTab = () => {
  const { rightTab } = useTabInfo();

  return (
    <div className="border-b-stroke-200 flex h-14 w-[480px] shrink-0 flex-col items-start justify-center gap-2.5 border-b border-solid bg-white px-5 py-[13px]">
      <div className="text-bt3-sb flex h-[30px] items-center justify-center gap-2.5 rounded-[7px] bg-gray-600 px-[9px] py-1.5">
        {AiMeetingAssistantRightTabLabels[rightTab as AiMeetingAssistantRightTabType]}
      </div>
    </div>
  );
};

export default AiMeetingAssistantLeftTab;
