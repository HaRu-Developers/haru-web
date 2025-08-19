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
 * SNS 이벤트 목록을 다운로드하기 위한 TanStack Query 커스텀 훅입니다.
 * @param {GetSnsEventAssistantListDownloadRequestDto} params - 다운로드에 필요한 이벤트 정보입니다.
 * @param {string} params.snsEventId - 다운로드할 SNS 이벤트의 고유 ID입니다.
 * @param {SnsEventAssistantListType} params.listType - 다운로드할 목록의 타입입니다.
 * @param {DownloadFormat} params.format - 다운로드할 파일의 형식입니다.
 * @param {UseSnsEventAssistantListDownloadOptions} [options] - useAfterQuery 훅에 전달할 옵션 객체입니다.
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
