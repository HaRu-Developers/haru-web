import { Suspense } from 'react';

import TermsModalPage from '../../@workspaceModal/(.)terms/page';
import MainPage from '../../page';

// 새로고침이나 직접 접근 시에도 TermsModalPage를 재활용
const TermsStandalonePage = async ({
  params,
}: Readonly<{
  params: Promise<{ workspaceId?: string }>;
}>) => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <TermsModalPage />
      </Suspense>
      <MainPage params={params} />
    </>
  );
};

export default TermsStandalonePage;
