import { defaultApi } from '@lib/fetcher';

import { PostSurveyRequestDto, SurveyQuestionTypeOnPost } from '@api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const submitSurvey = async (data: {
  moodTrackerHashedId: string;
  surveyQuestion: SurveyQuestionTypeOnPost[];
}) => {
  const requestBody: PostSurveyRequestDto = {
    answers: data.surveyQuestion,
  };

  const response = await defaultApi<BaseResponseDto<object>>(
    MOOD_TRACKER_API_ENDPOINTS.SUBMIT_SURVEY(data.moodTrackerHashedId),
    {
      method: 'POST',
      body: JSON.stringify(requestBody),
      auth: true,
    },
  );

  return response;
};
