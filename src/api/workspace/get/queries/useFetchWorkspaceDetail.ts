import { useCallback } from 'react';

import { notFound } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { WorkspaceDetail } from '../../api.types';
import fetchWorkspaceDetail from '../apis/fetchWorkspaceDetail';

/**
 * 내 워크 스페이스 리스트를 가져오는 훅
 */
const useFetchWorkspaceDetail = (workspaceId: string) => {
  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
      notFound(); // Next.js not-found.tsx로 이동
    }
  }, []);

  return useAfterQuery<
    { result: WorkspaceDetail }, // TData
    ApiError<ApiErrorBody>, // TError
    WorkspaceDetail // TExtra
  >({
    queryKey: queryKeys.workspaces.detail(workspaceId).queryKey,
    queryFn: () => fetchWorkspaceDetail({ workspaceId }),
    enabled: true,
    retry: false,
    onError: handleError,
    extra: (queryResult) =>
      queryResult.data?.result ?? {
        title: '',
        imageUrl: null,
        members: [],
      },
  });
};

export default useFetchWorkspaceDetail;
