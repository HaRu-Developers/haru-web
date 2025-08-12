import { Suspense } from 'react';

import DownloadModalPage from '../@modal/(.)download/page';

const DownloadStandalonePage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <DownloadModalPage />
    </Suspense>
  );
};

export default DownloadStandalonePage;
