import { SurveyBaseInfoResponseDto } from '@api/team-mood-tracker/apis.types';
import { getSurveyBasicInfo } from '@api/team-mood-tracker/get/apis/get-survey-basic-info';

import queryKeys from '@common/constants/query-key.constants';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

export const useSurveyBasicInfo = (moodTrackerHashedId: string) => {
  return useAfterQuery<SurveyBaseInfoResponseDto>({
    queryKey: queryKeys.moodTracker.surveyBasicInfo(moodTrackerHashedId).queryKey,
    queryFn: () => getSurveyBasicInfo(moodTrackerHashedId),
    enabled: !!moodTrackerHashedId,
  });
};
