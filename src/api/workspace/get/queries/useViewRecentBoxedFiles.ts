import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { ViewRecentBoxedFilesResponseDto } from '../../api.types';
import { viewRecentBoxedFiles } from '../apis/view-recent-boxed-files';

/**
 * @description 워크스페이스의 최근 조회 문서 ( Boxed File )를 가져오는 훅
 */

export const useViewRecentDocumentsQuery = (workspaceId: string) => {
  const router = useRouter();

  const handleError = useCallback(
    (error: ApiError<ApiErrorBody>) => {
      if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND);
      }
    },
    [router],
  );

  return useAfterQuery<
    ViewRecentBoxedFilesResponseDto, // TData: API 성공 시 받을 데이터 타입
    ApiError<ApiErrorBody> // TError: API 실패 시 받을 에러 타입
  >({
    queryKey: queryKeys.workspaces.recentBoxedFiles(workspaceId).queryKey,

    queryFn: () => viewRecentBoxedFiles({ workspaceId }),

    enabled: !!workspaceId,
    retry: false,
    onError: handleError,
  });
};
