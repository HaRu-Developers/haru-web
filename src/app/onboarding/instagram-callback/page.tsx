import { Suspense } from 'react';

import OnBoardingCallBackClient from '@features/on-boarding/components/OnBoardingCallBackClient/OnBoardingCallBackClient.client';

// 로딩 중에 보여줄 간단한 UI
const Loading = () => <div>인스타그램 계정을 연동 중입니다...</div>;

const InstagramCallbackPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OnBoardingCallBackClient />
    </Suspense>
  );
};

export default InstagramCallbackPage;
