import { defaultApi } from '@lib/fetcher';

import { GetSurveyQuestionListResponseDto } from '@api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const getSurveyQuestionList = async (moodTrackerHashedId: string) => {
  const response = await defaultApi<BaseResponseDto<GetSurveyQuestionListResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.QUESTIONS(moodTrackerHashedId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response.result;
};
