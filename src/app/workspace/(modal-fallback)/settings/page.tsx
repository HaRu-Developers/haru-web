import { Suspense } from 'react';

import MainWithoutWorkspaceLayout from '../../(without-workspace)/layout';
import MainWithoutWorkspacePage from '../../(without-workspace)/page';
import SettingsModalPage from '../../@modal/(.)settings/page';

const SettingsStandalonePage = ({ params }: { params: Promise<{ workspaceId?: string }> }) => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <SettingsModalPage />
      </Suspense>
      <MainWithoutWorkspaceLayout params={params}>
        <MainWithoutWorkspacePage />
      </MainWithoutWorkspaceLayout>
    </>
  );
};

export default SettingsStandalonePage;
