import { Suspense } from 'react';

import SettingsModalPage from '../../../../@modal/(.)settings/page';

const SettingsStandalonePage = ({ params }: { params: Promise<{ workspaceId?: string }> }) => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <SettingsModalPage />
      </Suspense>
    </>
  );
};

export default SettingsStandalonePage;
