import WorkSpaceOnBoarding from '@common/components/onboarding/WorkSpaceOnBoarding/WorkSpaceOnBoarding.server';

const OnBoardingPage = () => {
  return (
    <div className="flex">
      <WorkSpaceOnBoarding />
      <div className="w-[50vw]">
        <div>온보딩</div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
