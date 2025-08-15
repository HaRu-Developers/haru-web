import {
  TeamMoodReportDownloadLinkRequestDto,
  TeamMoodReportDownloadLinkResponseDto,
  UseTeamMoodDownloadLinkOptions,
} from '@api/team-mood-tracker/apis.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { downloadReport } from '../apis/download-report';

/**
 * @description 팀 분위기 리포트 다운로드 링크를 가져오는 훅
 */
export const useDownloadReportQuery = (
  params: TeamMoodReportDownloadLinkRequestDto,
  options?: UseTeamMoodDownloadLinkOptions,
) => {
  const { moodTrackerHashedId, format } = params;
  const { enabled = false, ...restOptions } = options || {};

  return useAfterQuery<
    TeamMoodReportDownloadLinkResponseDto, // TData
    ApiError<ApiErrorBody> // TError
  >({
    // ✅ query-key-factory를 사용하여 쿼리 키 생성
    queryKey: queryKeys.moodTracker.downloadLink(moodTrackerHashedId, format).queryKey,

    // ✅ params 객체를 queryFn에 그대로 전달
    queryFn: () => downloadReport(params),

    // enabled 플래그: id가 있고, 외부에서 enabled가 true일 때만 실행
    enabled: !!moodTrackerHashedId && enabled,

    retry: false,

    // onSuccess, onError 등 전달
    ...restOptions,
  });
};
