// OnBoardingTestPage.jsx
import LoginOnBoarding from '@common/components/OnBoarding/LoginOnBoaring/LoginOnBoarding.client';
import WorkSpaceOnBoarding from '@common/components/OnBoarding/WorkSpaceOnBoarding/WorkSpaceOnBoarding.server';

const OnBoardingTestPage = () => {
  return (
    // main 태그에 flex를 적용하여 자식 요소들을 가로로 나열합니다.
    <main className="flex bg-white">
      <LoginOnBoarding />
      <WorkSpaceOnBoarding />
    </main>
  );
};

export default OnBoardingTestPage;
