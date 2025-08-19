import { Suspense } from 'react';

import DownloadModalClient from '@features/sns-event-assistant/components/modal-client/DownLoadModalClient/DownloadModalClient';

const DownloadPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <DownloadModalClient />
    </Suspense>
  );
};

export default DownloadPage;
