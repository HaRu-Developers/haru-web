import { useQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { viewReportResponse } from '@/api/team-mood-tracker/get/apis/view-report-response';

/**
 * @description 팀 분위기 리포트 데이터를 조회하는 useQuery 커스텀 훅
 * @param moodTrackerHashedId 조회할 설문의 해시된 ID
 */

export const useViewReportResponse = (moodTrackerHashedId: string) => {
  return useQuery({
    ...queryKeys.moodTracker.report(moodTrackerHashedId),
    queryFn: () => viewReportResponse({ moodTrackerHashedId }),

    enabled: !!moodTrackerHashedId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 1000,
    gcTime: 1000 * 60 * 10,
    select: (data) => data.result,
  });
};
