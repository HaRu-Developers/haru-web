'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import type { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { SearchDocumentsRequestDto, SearchDocumentsResponseDto } from '../../api.types';
import { searchDocuments } from '../apis/search-documents';

export const useSearchDocumentsQuery = ({ workspaceId, title }: SearchDocumentsRequestDto) => {
  const router = useRouter();

  const handleError = useCallback(
    (error: ApiError<ApiErrorBody>) => {
      // 워크스페이스 자체가 없거나 권한 없음 → 404로
      if (error.status === 404 || error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND); // notFound() 대신 클라 라우팅
      }
    },
    [router],
  );

  return useAfterQuery<SearchDocumentsResponseDto, ApiError<ApiErrorBody>>({
    queryKey: queryKeys.workspaces.search(workspaceId, title).queryKey,
    queryFn: () => searchDocuments({ workspaceId, title }),
    enabled: !!workspaceId && title.trim().length > 0,
    onError: handleError,
    retry: false,
  });
};
