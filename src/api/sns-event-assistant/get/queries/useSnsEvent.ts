import { useCallback } from 'react';

import { notFound } from 'next/navigation';

import { GetSnsEventAssistantResponseDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { GetSnsEvent } from '../apis/get-sns-event';

/**
 * 특정 SNS 이벤트의 상세 정보를 조회하는 커스텀 훅입니다.
 * @param {string} snsEventId - 상세 정보를 조회할 SNS 이벤트의 고유 ID입니다.
 */
const useSnsEvent = (snsEventId: string) => {
  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
      notFound(); // Next.js not-found.tsx로 이동
    }
  }, []);

  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    { result: GetSnsEventAssistantResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    GetSnsEventAssistantResponseDto // TExtra
  >({
    queryKey: queryKeys.snsEventAssistant.detail(snsEventId).queryKey,
    queryFn: () => {
      return GetSnsEvent({ snsEventId });
    },
    enabled: !!snsEventId,
    retry: false,
    onError: handleError,
    extra: (queryResult) =>
      queryResult.data?.result ?? {
        title: '',
        creatorId: '',
        creatorName: '',
        updatedAt: new Date(),
        workspaceId: '',
        participantList: [],
        winnerList: [],
        snsLink: '',
      },
  });
};

export default useSnsEvent;
