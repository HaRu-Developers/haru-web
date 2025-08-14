import { Suspense } from 'react';

import SearchModalPage from '../../@withWorkspaceModal/(.)search/page';
import MainWithWorkspacePage from '../../page';

const DownloadStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <SearchModalPage />
      </Suspense>
      <MainWithWorkspacePage />
    </>
  );
};

export default DownloadStandalonePage;
