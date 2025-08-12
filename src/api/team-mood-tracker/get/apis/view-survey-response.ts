import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import {
  GetViewSurveyRequestDto,
  GetViewSurveyResponseDto,
} from '@/api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@/api/team-mood-tracker/end-point.constants';

export const viewSurveyResponse = async ({ moodTrackerHashedId }: GetViewSurveyRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetViewSurveyResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.RESPONSES(moodTrackerHashedId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
