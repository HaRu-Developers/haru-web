import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { GetInstagramResponseDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { GetInstagram } from '../apis/get-instagram';

const useInstagram = (workspaceId: string) => {
  const router = useRouter();

  const handleError = useCallback(
    (error: ApiError<ApiErrorBody>) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND);
      }
    },
    [router],
  );

  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    { result: GetInstagramResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    GetInstagramResponseDto // TExtra
  >({
    queryKey: queryKeys.snsEventAssistant.instagram(workspaceId).queryKey,
    queryFn: () => {
      return GetInstagram({ workspaceId });
    },
    enabled: !!workspaceId,
    retry: false,
    onError: handleError,
    extra: (queryResult) => ({
      instagramAccountName: queryResult.data?.result?.instagramAccountName || '',
    }),
  });
};

export default useInstagram;
