import { getTeamMoodTrackerReportList } from '@api/team-mood-tracker/get/apis/get-team-mood-tracker-report-list';

import queryKeys from '@common/constants/query-key.constants';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

export const useGetTeamMoodTrackerReportList = ({ workspaceId }: { workspaceId: string }) => {
  return useAfterQuery({
    queryFn: () => getTeamMoodTrackerReportList({ workspaceId }),
    queryKey: queryKeys.moodTracker.reportList(workspaceId).queryKey,
    enabled: !!workspaceId,
  });
};
