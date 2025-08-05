import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { fetchRecentDocumentsResponseDto, fetchRecentDocumentsResquestDto } from '../../api.types';
import { WORKSPACE_API_ENDPOINTS } from '../../end-point.constants';

export const fetchRecentDocuments = async ({ workspaceId }: fetchRecentDocumentsResquestDto) => {
  const response = await defaultApi<BaseResponseDto<fetchRecentDocumentsResponseDto>>(
    WORKSPACE_API_ENDPOINTS.RECENT_DOCUMENTS(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
