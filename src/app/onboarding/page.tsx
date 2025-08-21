'use client';

import { useEffect } from 'react';

import WorkSpaceOnBoarding from '@common/components/onboarding/WorkSpaceOnBoarding/WorkSpaceOnBoarding.server';

import {
  useOnboardingActions,
  useOnboardingState,
} from '@features/on-boarding/hooks/stores/useOnBoardingStore';

import OnBoardingImageStep from '@features/on-boarding/components/OnBoardingImageStep/OnBoardingImageStep';
import OnBoardingInstaStep from '@features/on-boarding/components/OnBoardingInstaStep/OnBoardingInstaStep';
import OnBoardingInviteStep from '@features/on-boarding/components/OnBoardingInviteStep/OnBoardingInviteStep';
import OnBoardingNameStep from '@features/on-boarding/components/OnBoardingNameStep/OnBoardingNameStep.client';
import OnBoardingStepBar from '@features/on-boarding/components/OnBoardingStepBar/OnBoardingStepBar';
import OnboardingToaster from '@features/on-boarding/components/onboarding-toast/OnboardingToaster/OnboardingToaster.client';

const OnBoardingPage = () => {
  const { step } = useOnboardingState();
  const { reset } = useOnboardingActions();

  const renderStepComponent = () => {
    switch (step) {
      case 0:
        return <OnBoardingNameStep />;
      case 1:
        return <OnBoardingImageStep />;
      case 2:
        return <OnBoardingInviteStep />;
      case 3:
        return <OnBoardingInstaStep />;
      default:
        return <OnBoardingNameStep />;
    }
  };

  // TODO: on page leave, set step to default state

  useEffect(() => {
    // 이 컴포넌트가 화면에서 사라질 때(unmount) return 안의 함수가 실행됩니다.
    return () => {
      reset();
    };
  }, [reset]); // reset 함수는 안정적이므로 이 effect는 언마운트 시에만 실행됩니다.

  return (
    <div className="flex">
      <WorkSpaceOnBoarding />
      <div className="flex h-screen w-[50vw] flex-col items-center justify-center">
        <div className="mb-54pxr w-404pxr flex items-start">
          <OnBoardingStepBar />
        </div>
        {/* 테스트용 버튼 */}
        {/* TODO: 실제로는 mutation 에서 사용 */}
        {renderStepComponent()}
        <OnboardingToaster />
      </div>
    </div>
  );
};

export default OnBoardingPage;
