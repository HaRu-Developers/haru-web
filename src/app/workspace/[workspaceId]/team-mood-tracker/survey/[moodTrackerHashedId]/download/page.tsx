import React from 'react';

import TeamMoodTrackerDetailPage from '@features/team-mood-tracker/components/page-wrapper/TeamMoodTrackerDetailPage/TeamMoodTrackerDetailPage.client';

import DownloadModalPage from '@app/workspace/[workspaceId]/team-mood-tracker/@teamMoodTrackerGeneralModal/(.)survey//[moodTrackerHashedId]/download/page';

const downlaodFallbackPage = () => {
  return (
    <div>
      <DownloadModalPage />
      <TeamMoodTrackerDetailPage />
    </div>
  );
};

export default downlaodFallbackPage;
