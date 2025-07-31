import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';
import {
  fetchRecentDocumentsResponseDto,
  fetchRecentDocumentsResquestDto,
} from '@common/types/gnb-left/api.types';

import { API_ENDPOINTS } from '@common/constants/gnb-left/end-point.constants';

export const fetchRecentDocuments = async ({
  workspaceId,
}: fetchRecentDocumentsResquestDto): Promise<BaseResponseDto<fetchRecentDocumentsResponseDto>> => {
  const response = await defaultApi<BaseResponseDto<fetchRecentDocumentsResponseDto>>(
    API_ENDPOINTS.RECENT_DOCUMENTS(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
