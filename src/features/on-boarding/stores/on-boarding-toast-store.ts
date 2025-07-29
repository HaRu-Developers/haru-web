import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { OnboardingToastItem } from '@features/on-boarding/types/OnboardingToast.types';

interface OnboardingToastStoreState {
  onboardingToast: OnboardingToastItem | null;
  actions: {
    showOnboardingToast: (toast: OnboardingToastItem) => void;
    hideOnboardingToast: () => void;
  };
}

const onboardingToastStore = create<OnboardingToastStoreState>()(
  devtools(
    immer((set) => ({
      onboardingToast: null,
      actions: {
        showOnboardingToast: (toast) =>
          set((s) => {
            s.onboardingToast = toast;
          }),
        hideOnboardingToast: () =>
          set((s) => {
            s.onboardingToast = null;
          }),
      },
    })),
    { name: 'OnbordingToastStore' },
  ),
);

export default onboardingToastStore;
