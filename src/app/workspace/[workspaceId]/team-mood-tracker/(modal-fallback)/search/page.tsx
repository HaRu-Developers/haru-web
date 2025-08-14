import { Suspense } from 'react';

import TeamMoodTrackerSearchModal from '../../@modal/(.)search/page';
import TeamMoodTrackerDefaultPage from '../../page';

const TeamMoodTrackerSearchStandalonePage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <TeamMoodTrackerSearchModal />
      </Suspense>
      <TeamMoodTrackerDefaultPage params={params} />
    </>
  );
};

export default TeamMoodTrackerSearchStandalonePage;
