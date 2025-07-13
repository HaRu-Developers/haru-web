import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { RightTabType } from '@features/ai-meeting-manager/constants/tabs';

interface tabStoreState {
  isEditing: boolean;
  rightTab: RightTabType;
  actions: {
    setEditing: (val: boolean) => void;
    setRightTab: (tab: RightTabType) => void;
  };
}

const tabStore = create<tabStoreState>()(
  devtools(
    immer((set) => ({
      isEditing: false,
      rightTab: RightTabType.AI_QUESTIONS,
      actions: {
        setEditing: (val) => set({ isEditing: val }),
        setRightTab: (tab) => set({ rightTab: tab }),
      },
    })),
  ),
);

export default tabStore;
