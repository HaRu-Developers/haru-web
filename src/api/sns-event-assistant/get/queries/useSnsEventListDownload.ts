import {
  GetSnsEventAssistantListDownloadRequestDto,
  GetSnsEventAssistantListDownloadResponseDto,
  UseSnsEventAssistantListDownloadOptions,
} from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { GetSnsEventListDownLoad } from '../apis/get-sns-event-list-download';

/**
 * SNS 이벤트 상세 조회를 위한 커스텀 훅
 */
const useSnsEventListDownload = (
  params: GetSnsEventAssistantListDownloadRequestDto,
  options?: UseSnsEventAssistantListDownloadOptions,
) => {
  const { snsEventId } = params;
  const { enabled = false, ...restOptions } = options || {};
  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    GetSnsEventAssistantListDownloadResponseDto, // TData
    ApiError<ApiErrorBody> // TError
  >({
    queryKey: queryKeys.snsEventAssistant.download(snsEventId).queryKey,
    queryFn: async () => {
      const response = await GetSnsEventListDownLoad(params);
      return response.result;
    },
    enabled: !!snsEventId && enabled,
    retry: false,
    ...restOptions,
  });
};

export default useSnsEventListDownload;
