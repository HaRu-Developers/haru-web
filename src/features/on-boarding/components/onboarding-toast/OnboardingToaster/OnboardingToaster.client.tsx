'use client';

import { useOnboardingToastInfo } from '@features/on-boarding/hooks/stores/useOnboardingToastStore';

import OnboardingToast from '../OnboardingToast/OnboardingToast.client';

const OnboardingToaster = () => {
  const { onboardingToast } = useOnboardingToastInfo();

  if (!onboardingToast) return null;

  return (
    <div className="top-74pxr fixed z-1 mx-auto">
      <OnboardingToast onboardingToast={onboardingToast} />
    </div>
  );
};

export default OnboardingToaster;
