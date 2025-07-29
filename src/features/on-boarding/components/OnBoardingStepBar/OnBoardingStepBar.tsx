'use client';

import { useOnboardingStep } from '@features/on-boarding/hooks/stores/useOnBoardingStore';

const steps = ['이름', '이미지', '초대', '연동'];

const OnBoardingStepBar = () => {
  const step = useOnboardingStep();

  return (
    <div className="gap-7pxr flex items-center justify-center">
      {steps.map((_, idx) => (
        <div
          key={idx}
          className={`h-5pxr w-36pxr rounded-100pxr transition-colors ${
            idx <= step ? 'bg-primary' : 'bg-stroke-200'
          }`}
        />
      ))}
    </div>
  );
};

export default OnBoardingStepBar;
