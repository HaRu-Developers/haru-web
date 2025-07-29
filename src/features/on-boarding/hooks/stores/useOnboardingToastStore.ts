import { useShallow } from 'zustand/shallow';

import onboardingToastStoreState from '@features/on-boarding/stores/on-boarding-toast-store';

export const useOnboardingToastInfo = () =>
  onboardingToastStoreState(
    useShallow((state) => ({
      onboardingToast: state.onboardingToast,
    })),
  );

export const useOnboardingToastActions = () => onboardingToastStoreState((state) => state.actions);
