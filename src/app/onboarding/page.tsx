'use client';

import WorkSpaceOnBoarding from '@common/components/onboarding/WorkSpaceOnBoarding/WorkSpaceOnBoarding.server';

import { OnboardingToastType } from '@features/onboarding/types/OnboardingToast.types';

import { useOnboardingToastActions } from '@features/onboarding/hooks/stores/useOnboardingToastStore';

import OnboardingToaster from '@features/onboarding/onboarding-toast/OnboardingToaster/OnboardingToaster.client';

// import { useOnboardingState } from '@features/on-boarding/hooks/stores/useOnBoardingStore';

// import OnBoardingImageStep from '@features/on-boarding/components/OnBoardingImageStep/OnBoardingImageStep';
// import OnBoardingInstaStep from '@features/on-boarding/components/OnBoardingInstaStep/OnBoardingInstaStep';
// import OnBoardingInviteStep from '@features/on-boarding/components/OnBoardingInviteStep/OnBoardingInviteStep';
// import OnBoardingNameStep from '@features/on-boarding/components/OnBoardingNameStep/OnBoardingNameStep.client';
// import OnBoardingStepBar from '@features/on-boarding/components/OnBoardingStepBar/OnBoardingStepBar';

const OnBoardingPage = () => {
  // const { step } = useOnboardingState();

  // const renderStepComponent = () => {
  //   switch (step) {
  //     case 0:
  //       return <OnBoardingNameStep />;
  //     case 1:
  //       return <OnBoardingImageStep />;
  //     case 2:
  //       return <OnBoardingInviteStep />;
  //     case 3:
  //       return <OnBoardingInstaStep />;
  //     default:
  //       return <OnBoardingNameStep />;
  //   }
  // };

  // 실제로는 mutation 에서 사용
  const { showOnboardingToast } = useOnboardingToastActions();
  const handleClick = (type: OnboardingToastType) => {
    showOnboardingToast({
      type: type,
      snsAccount: 'k_nijy',
    });
  };

  return (
    <div className="flex">
      <WorkSpaceOnBoarding />
      <div className="flex h-screen w-[50vw] flex-col items-center justify-center">
        <div className="mb-54pxr w-404pxr flex items-start">{/* <OnBoardingStepBar /> */}</div>
        <button onClick={() => handleClick(OnboardingToastType.SUCCESS_INVITE)}>
          초대 성공 토스트 열기
        </button>
        <button onClick={() => handleClick(OnboardingToastType.SUCCESS_SNS_ACCOUNT)}>
          sns 계정 연동 성공 토스트 열기
        </button>
        {/* {renderStepComponent()} */}
        <OnboardingToaster />
      </div>
    </div>
  );
};

export default OnBoardingPage;
