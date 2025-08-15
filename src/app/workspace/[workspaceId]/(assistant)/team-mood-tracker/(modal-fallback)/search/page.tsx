import { Suspense } from 'react';

import SearchModalPage from '@/app/workspace/[workspaceId]/(main)/@modal/(.)search/page';
import TeamMoodTrackerDefaultPage from '@/app/workspace/[workspaceId]/team-mood-tracker/page';

const TeamMoodTrackerSearchStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <SearchModalPage />
      </Suspense>
      <TeamMoodTrackerDefaultPage />
    </>
  );
};

export default TeamMoodTrackerSearchStandalonePage;
