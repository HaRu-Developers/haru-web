import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TeamMoodTrackerToastItem } from '../types/TeamMoodTrackerToastStore.types';

interface TeamMoodTrackerToastStoreState {
  copyToast: TeamMoodTrackerToastItem | null;
  actions: {
    showCopyToast: (toast: TeamMoodTrackerToastItem) => void;
    hideCopyToast: () => void;
  };
}

const TeamMoodTrackerToastStore = create<TeamMoodTrackerToastStoreState>()(
  devtools(
    immer((set) => ({
      copyToast: null,
      actions: {
        showCopyToast: (toast) =>
          set((s) => {
            s.copyToast = toast;
          }),
        hideCopyToast: () =>
          set((s) => {
            s.copyToast = null;
          }),
      },
    })),
    { name: 'TeamMoodTrackerToastStore' },
  ),
);

export default TeamMoodTrackerToastStore;
