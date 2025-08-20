import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTeamMoodTrackerReport } from '@api/team-mood-tracker/post/apis/delete-team-mood-tracker-report';

import queryKeys from '@common/constants/query-key.constants';

export const useDeleteReport = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamMoodTrackerReport,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.moodTracker.reportList(workspaceId).queryKey,
      }),
  });
};
