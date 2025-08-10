import { Suspense } from 'react';

import MainWithoutWorkspaceLayout from '../../../(without-workspace)/layout';
import MainWithoutWorkspacePage from '../../../(without-workspace)/page';
import ChangePasswordModalPage from '../../../@modal/(.)settings/(.)change-password/page';

const ChangePasswordStandalonePage = ({
  params,
}: {
  params: Promise<{ workspaceId?: string }>;
}) => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <ChangePasswordModalPage />
      </Suspense>
      <MainWithoutWorkspaceLayout params={params}>
        <MainWithoutWorkspacePage />
      </MainWithoutWorkspaceLayout>
    </>
  );
};

export default ChangePasswordStandalonePage;
