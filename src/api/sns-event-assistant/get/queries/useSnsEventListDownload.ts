import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { GetSnsEventAssistantListDownloadResponseDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';
import { Format, SnsEventAssistantListType } from '@common/types/download.enum.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { GetSnsEventListDownLoad } from '../apis/get-sns-event-list-download';

/**
 * SNS 이벤트 상세 조회를 위한 커스텀 훅
 */
const useSnsEventListDownload = (
  snsEventId: string,
  listType: SnsEventAssistantListType,
  format: Format,
) => {
  const router = useRouter();

  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
      router.replace(ROUTES.NOT_FOUND);
    }
  }, []);

  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    { result: GetSnsEventAssistantListDownloadResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    GetSnsEventAssistantListDownloadResponseDto // TExtra
  >({
    queryKey: queryKeys.snsEventAssistant.download(snsEventId).queryKey,
    queryFn: () => {
      return GetSnsEventListDownLoad({ snsEventId, listType, format });
    },
    enabled: !!snsEventId,
    retry: false,
    onError: handleError,
    extra: (queryResult) =>
      queryResult.data?.result ?? {
        downloadLink: '',
      },
  });
};

export default useSnsEventListDownload;
