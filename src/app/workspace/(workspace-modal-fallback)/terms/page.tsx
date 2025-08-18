import { Suspense } from 'react';

import TermsModalPage from '@app/workspace/@workspaceModal/(.)terms/page';
import MainPage from '@app/workspace/page';

// 새로고침이나 직접 접근 시에도 TermsModalPage를 재활용
const TermsStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <TermsModalPage />
      </Suspense>
      <MainPage />
    </>
  );
};

export default TermsStandalonePage;
