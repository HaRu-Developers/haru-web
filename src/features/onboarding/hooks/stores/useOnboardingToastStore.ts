import { useShallow } from 'zustand/shallow';

import onboardingToastStoreState from '@features/onboarding/stores/onBoardingToastStore';

export const useOnboardingToastInfo = () =>
  onboardingToastStoreState(
    useShallow((state) => ({
      onboardingToast: state.onboardingToast,
    })),
  );

export const useOnboardingToastActions = () => onboardingToastStoreState((state) => state.actions);
