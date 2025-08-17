import { Suspense } from 'react';

import TermsModalPage from '@/app/workspace/@workspaceModal/(.)terms/page';
import MainWithWorkspacePage from '@/app/workspace/[workspaceId]/page';

const TermsStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <TermsModalPage />
      </Suspense>
      <MainWithWorkspacePage />
    </>
  );
};

export default TermsStandalonePage;
