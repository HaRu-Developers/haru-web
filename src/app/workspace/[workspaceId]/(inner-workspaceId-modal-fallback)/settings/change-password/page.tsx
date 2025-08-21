'use client';

import { Suspense } from 'react';
import MainWithWorkspacePage from '@app/workspace/[workspaceId]/page';
// import SettingsPage from '@app/workspace/[workspaceId]/@innerWorkspaceIdModal/(.)settings/page';
import ChangePasswordModalPage from '@app/workspace/[workspaceId]/@innerWorkspaceIdModal/(.)settings/change-password/page';

const ChangePasswordStandalonePage = () => (
  <>
    <Suspense fallback={<div>로딩중...</div>}>
      <ChangePasswordModalPage />
    </Suspense>
    <MainWithWorkspacePage />
  </>
);

export default ChangePasswordStandalonePage;
