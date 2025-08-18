import { Suspense } from 'react';

import SearchModalPage from '@app/workspace/[workspaceId]/@innerWorkspaceIdModal/(.)search/page';
import MainWithWorkspacePage from '@app/workspace/[workspaceId]/page';

const SearchStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <SearchModalPage />
      </Suspense>
      <MainWithWorkspacePage />
    </>
  );
};

export default SearchStandalonePage;
