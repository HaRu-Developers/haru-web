// OnBoardingTestPage.jsx
import OnBoarding from '@common/components/OnBoarding/OnBoarding';

const OnBoardingTestPage = () => {
  return (
    // main 태그에 flex를 적용하여 자식 요소들을 가로로 나열합니다.
    <main className="flex bg-white">
      <OnBoarding />
      <div className="w-[50vw]">hello</div>
    </main>
  );
};

export default OnBoardingTestPage;
