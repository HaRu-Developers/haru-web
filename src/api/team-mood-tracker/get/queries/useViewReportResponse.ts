// ✅ useQuery를 useAfterQuery로 변경합니다.
import { GetViewReportResponseDto } from '@api/team-mood-tracker/apis.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { viewReportResponse } from '@/api/team-mood-tracker/get/apis/view-report-response';

/**
 * @description 팀 분위기 리포트 데이터를 조회하는 useQuery 커스텀 훅
 * @param moodTrackerHashedId 조회할 설문의 해시된 ID
 */
export const useViewReportResponse = (moodTrackerHashedId: string) => {
  return useAfterQuery<GetViewReportResponseDto, ApiError<ApiErrorBody>>({
    ...queryKeys.moodTracker.report(moodTrackerHashedId),
    queryFn: () => viewReportResponse({ moodTrackerHashedId }),
    enabled: !!moodTrackerHashedId,
    // ✅ select 옵션은 API 함수에서 .result를 반환하므로 더 이상 필요하지 않습니다.
  });
};
