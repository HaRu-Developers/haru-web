import { Suspense } from 'react';

import SearchModalPage from '@/app/workspace/[workspaceId]/(main)/@modal/(.)search/page';

import AiMeetingManagerDefaultPage from '../../page';

const AiMeetingManagerSearchStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <SearchModalPage />
      </Suspense>
      <AiMeetingManagerDefaultPage />
    </>
  );
};

export default AiMeetingManagerSearchStandalonePage;
