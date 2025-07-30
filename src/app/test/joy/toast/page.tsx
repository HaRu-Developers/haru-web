'use client';

import SurveyLinkCreatedModal from '@common/components/modals/SurveyLinkCreatedModal/SurveyLinkCreatedModal.client';

const ToastTestPage = () => {
  // 임시 이벤트 리스너
  const handleDevMode = () => console.log('Something Clicked');

  return (
    <>
      <div className="p-10 text-center text-black">토스트 테스트 페이지</div>
      <SurveyLinkCreatedModal
        onClose={handleDevMode}
        onEmailSendClick={handleDevMode}
        surveyLink="short link"
      />
    </>
  );
};

export default ToastTestPage;
