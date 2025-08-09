import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { SearchDocumentsRequestDto, SearchDocumentsResponseDto } from '../../api.types';
import { WORKSPACE_API_ENDPOINTS } from '../../end-point.constants';

export const searchDocuments = async ({ workspaceId, title }: SearchDocumentsRequestDto) => {
  // 쿼리 파라미터를 안전하게 추가하기 위해 URLSearchParams 사용
  const params = new URLSearchParams({ title });
  const query = params.toString();

  const response = await defaultApi<BaseResponseDto<SearchDocumentsResponseDto>>(
    `${WORKSPACE_API_ENDPOINTS.SEARCH_DOCUMENTS(workspaceId)}?${query}`,
    {
      method: 'GET',
    },
  );

  return response.result;
};
