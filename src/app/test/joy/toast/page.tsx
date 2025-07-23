'use client';

import SurveyLinkCreatedModal from '@common/components/modals/SurveyLinkCreatedModal/SurveyLinkCreatedModal.client';

const ToastTestPage = () => {
  // 임시 이벤트 리스너
  const handleDevMode = () => console.log('Something Clicked');

  return (
    <>
      <div className="p-10 text-center text-black">토스트 테스트 페이지</div>
      <p className="mb-10">
        토스트 쓰려면 병렬 라우터(Parallel Routes)로 렌더링된 토스터 컴포넌트가 같은 레벨의
        layout.tsx에서 렌더링되고 있어야 합니다.
      </p>
      <SurveyLinkCreatedModal
        onClose={handleDevMode}
        onEmailSendClick={handleDevMode}
        surveyLink="short link"
      />
    </>
  );
};

export default ToastTestPage;
