import { useShallow } from 'zustand/shallow';

import { OnboardingStep } from '@features/on-boarding/constants/step';

import useOnboardingStore from '@features/on-boarding/stores/on-boarding-store';

export const useOnboardingState = () =>
  useOnboardingStore(
    useShallow((state) => ({
      step: state.step,
      name: state.name,
      image: state.image,
      emails: state.emails,
    })),
  );

// action 가져오는 훅
export const useOnboardingActions = () => useOnboardingStore((state) => state.actions);

// step 가져오는 훅
export const useOnboardingStep = () => useOnboardingStore((state) => state.step);

// 이메일만 가져오는 훅
export const useOnboardingEmails = () => useOnboardingStore((state) => state.emails);

// 인스타그램 연동 확인 훅
export const useInstagramConnection = () =>
  useOnboardingStore((state) => state.isInstagramConnected);

export { OnboardingStep };
