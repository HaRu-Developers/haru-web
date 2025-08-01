import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import {
  GetViewSurveyRequestDto,
  GetViewSurveyResponseDto,
} from '@features/team-mood-tracker/types/apis.types';

import { MOOD_TRACKER_API_ENDPOINTS } from '@features/team-mood-tracker/constants/end-point.constants';

export const viewSurveyResponse = async ({
  moodTrackerHashedId,
}: GetViewSurveyRequestDto): Promise<BaseResponseDto<GetViewSurveyResponseDto>> => {
  const response = await defaultApi<BaseResponseDto<GetViewSurveyResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.RESPONSES(moodTrackerHashedId),
    {
      method: 'GET',
    },
  );

  return response;
};
