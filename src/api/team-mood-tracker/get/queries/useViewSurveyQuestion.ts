import { GetSurveyQuestionListResponseDto } from '@api/team-mood-tracker/apis.types';
import { getSurveyQuestionList } from '@api/team-mood-tracker/get/apis/view-survey-question';

import queryKeys from '@common/constants/query-key.constants';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

export const useViewSurveyQuestion = (moodTrackerHashedId: string) => {
  return useAfterQuery<GetSurveyQuestionListResponseDto>({
    queryFn: () => getSurveyQuestionList(moodTrackerHashedId),
    enabled: !!moodTrackerHashedId,
    // enabled: false,
    queryKey: queryKeys.moodTracker.question(moodTrackerHashedId).queryKey,
  });
};
