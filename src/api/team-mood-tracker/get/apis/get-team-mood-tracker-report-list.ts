import { defaultApi } from '@lib/fetcher';

import { GetTeamMoodTrackerReportListResponseDto } from '@api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const getTeamMoodTrackerReportList = async ({ workspaceId }: { workspaceId: string }) => {
  const response = await defaultApi<BaseResponseDto<GetTeamMoodTrackerReportListResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.REPORT_LIST(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response.result;
};
