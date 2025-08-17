import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { GetViewSurveyResponseDto } from '@/api/team-mood-tracker/apis.types';
import { viewSurveyResponse } from '@/api/team-mood-tracker/get/apis/view-survey-response';

/**
 * @description 팀 설문 응답 데이터를 조회하는 useQuery 커스텀 훅
 * @param moodTrackerHashedId 조회할 설문의 해시된 ID
 */

export const useViewSurveyResponse = (moodTrackerHashedId: string) => {
  return useAfterQuery<GetViewSurveyResponseDto, ApiError<ApiErrorBody>>({
    ...queryKeys.moodTracker.detail(moodTrackerHashedId),
    queryFn: () => viewSurveyResponse({ moodTrackerHashedId }),
    enabled: !!moodTrackerHashedId,
  });
};
