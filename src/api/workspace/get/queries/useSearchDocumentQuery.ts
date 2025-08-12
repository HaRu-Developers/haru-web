import { useCallback } from 'react';

import { notFound } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { SearchDocumentsRequestDto, SearchDocumentsResponseDto } from '../../api.types';
import { searchDocuments } from '../apis/search-documents';

export const useSearchDocumentsQuery = ({ workspaceId, title }: SearchDocumentsRequestDto) => {
  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.WORKSPACE.NOT_FOUND) {
      notFound();
    }
  }, []);

  return useAfterQuery<SearchDocumentsResponseDto, ApiError<ApiErrorBody>>({
    queryKey: queryKeys.workspaces.search(workspaceId, title).queryKey,
    queryFn: () => searchDocuments({ workspaceId, title }),
    enabled: !!workspaceId && title.trim().length > 0,
    onError: handleError,
    retry: false,
  });
};
