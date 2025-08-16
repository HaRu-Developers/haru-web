import { Suspense } from 'react';

import ChangePasswordModalPage from '@/app/workspace/[workspaceId]/@innerWorkspaceIdModal/(.)settings/(.)change-password/page';

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
    </>
  );
};

export default ChangePasswordStandalonePage;
