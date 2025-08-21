import { defaultApi } from '@lib/fetcher';

import { SurveyBaseInfoResponseDto } from '@api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const getSurveyBasicInfo = async (moodTrackerHashedId: string) => {
  const response = await defaultApi<BaseResponseDto<SurveyBaseInfoResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.SURVEY_BASIC_INFO(moodTrackerHashedId),
    {
      method: 'GET',
    },
  );

  return response.result;
};
