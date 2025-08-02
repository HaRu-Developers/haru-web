import { Suspense } from 'react';

import MainWithoutWorkspaceLayout from '../../(without-workspace)/layout';
import MainWithoutWorkspacePage from '../../(without-workspace)/page';
import TermsModalPage from '../../@modal/(.)terms/page';

// 새로고침이나 직접 접근 시에도 TermsModalPage를 재활용
const TermsStandalonePage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <TermsModalPage />
      <MainWithoutWorkspaceLayout>
        <MainWithoutWorkspacePage />
      </MainWithoutWorkspaceLayout>
    </Suspense>
  );
};

export default TermsStandalonePage;
