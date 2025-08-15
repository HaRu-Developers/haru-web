import { defaultApi } from '@lib/fetcher';

import {
  CreateNewSurveyRequestDto,
  CreateNewSurveyResponseDto,
  SendMoodTrackLinkToTeammateViaEmailRequestDto,
} from '@api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@api/team-mood-tracker/end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

export const createNewSurvey = async (data: {
  workspaceId: string;
  surveyData: CreateNewSurveyRequestDto;
}) => {
  // TODO: loading modal test를 위한 promise, delete in PROD
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = defaultApi<BaseResponseDto<CreateNewSurveyResponseDto>>(
    MOOD_TRACKER_API_ENDPOINTS.CREATE_SURVEY(data.workspaceId),
    {
      method: 'POST',
      body: JSON.stringify(data.surveyData),
      auth: true,
    },
  );

  return response;
};

export const sendEmail = async ({
  moodTrackerHashedId,
}: SendMoodTrackLinkToTeammateViaEmailRequestDto) => {
  const response = defaultApi<BaseResponseDto<object>>(
    MOOD_TRACKER_API_ENDPOINTS.SEND_EMAIL(moodTrackerHashedId),
    {
      method: 'POST',
      auth: true,
    },
  );

  return response;
};
