import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import {
  GetViewReportRequestDto,
  GetViewReportResponseDto,
} from '@/api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@/api/team-mood-tracker/end-point.constants';

export const viewReportResponse = async ({ moodTrackerHashedId }: GetViewReportRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetViewReportResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.REPORTS(moodTrackerHashedId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
