import { defaultApi } from '@lib/fetcher';

import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const deleteTeamMoodTrackerReport = async (moodTrackerHashedId: string) => {
  const response = await defaultApi<BaseResponseDto<object>>(
    MOOD_TRACKER_API_ENDPOINTS.DELETE_REPORT(moodTrackerHashedId),
    {
      method: 'DELETE',
      auth: true,
    },
  );

  return response;
};
