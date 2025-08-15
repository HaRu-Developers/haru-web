import { useCallback } from 'react';

import { notFound } from 'next/navigation';

import { GetSnsEventAssistantListResponseDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { GetSnsEventList } from '../apis/get-sns-event-list';

/**
 * SNS 이벤트 상세 조회를 위한 커스텀 훅
 */
const useSnsEventList = (workspaceId: string) => {
  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
      notFound(); // Next.js not-found.tsx로 이동
    }
  }, []);

  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    { result: GetSnsEventAssistantListResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    GetSnsEventAssistantListResponseDto // TExtra
  >({
    queryKey: queryKeys.snsEventAssistant.list(workspaceId).queryKey,
    queryFn: () => {
      return GetSnsEventList({ workspaceId });
    },
    enabled: !!workspaceId,
    retry: false,
    onError: handleError,
    extra: (queryResult) => ({
      snsEventList: queryResult.data?.result?.snsEventList ?? [],
    }),
  });
};

export default useSnsEventList;
