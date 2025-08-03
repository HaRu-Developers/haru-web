import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import {
  GetViewReportRequestDto,
  GetViewReportResponseDto,
} from '@features/team-mood-tracker/types/apis.types';

import { MOOD_TRACKER_API_ENDPOINTS } from '@features/team-mood-tracker/constants/end-point.constants';

export const viewReportResponse = async ({
  moodTrackerHashedId,
}: GetViewReportRequestDto): Promise<BaseResponseDto<GetViewReportResponseDto>> => {
  const response = await defaultApi<BaseResponseDto<GetViewReportResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.REPORTS(moodTrackerHashedId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
