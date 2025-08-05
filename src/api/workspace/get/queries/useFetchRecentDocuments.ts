import { useCallback } from 'react';

import { notFound } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { Document } from '../../api.types';
import { fetchRecentDocuments } from '../apis/fetchRecentDocuments';

/**
 * gnb left에서 워크 스페이스의 최근 조회 파일 가져오는 훅
 */
const useFetchRecentDocuments = (workspaceId: number) => {
  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
      notFound(); // Next.js not-found.tsx로 이동
    }
  }, []);

  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    { result: { documents: Document[] } }, // TData
    ApiError<ApiErrorBody>, // TError
    Document[] // TExtra
  >({
    queryKey: queryKeys.workspaces.recentDocuments(workspaceId).queryKey,
    queryFn: () => fetchRecentDocuments({ workspaceId }),
    enabled: !!workspaceId,
    retry: false,
    onError: handleError,
    extra: (queryResult) => queryResult.data?.result?.documents ?? [],
  });
};

export default useFetchRecentDocuments;
