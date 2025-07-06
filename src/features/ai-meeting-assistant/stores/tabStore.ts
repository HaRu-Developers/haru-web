import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AiMeetingAssistantRightTabType } from '@/features/ai-meeting-assistant/constants/tabs';

interface tabStoreState {
  isEditing: boolean;
  rightTab: AiMeetingAssistantRightTabType;
  actions: {
    setEditing: (val: boolean) => void;
    setRightTab: (tab: AiMeetingAssistantRightTabType) => void;
  };
}

const tabStore = create<tabStoreState>()(
  devtools(
    immer((set) => ({
      isEditing: false,
      rightTab: AiMeetingAssistantRightTabType.AiQuestions,
      actions: {
        setEditing: (val) => set({ isEditing: val }),
        setRightTab: (tab) => set({ rightTab: tab }),
      },
    })),
  ),
);

export default tabStore;
