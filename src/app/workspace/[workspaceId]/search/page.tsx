import { Suspense } from 'react';

import SearchModalPage from '../@modal/(.)search/page';

const DownloadStandalonePage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SearchModalPage />
    </Suspense>
  );
};

export default DownloadStandalonePage;
