'use client';

import SettingModalPage from '../../@innerWorkspaceIdModal/(.)settings/page';
import { Suspense } from 'react';
import MainWithWorkspacePage from '@app/workspace/[workspaceId]/page';

const SettingsStandalonePage = () => (
  <>
    <Suspense fallback={<div>로딩중...</div>}>
      <SettingModalPage />
    </Suspense>
    <MainWithWorkspacePage />
  </>
);

export default SettingsStandalonePage;
