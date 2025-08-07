import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACE_API_END_POINTS } from '../../api-end-point.constants';
import { FetchRecentDocumentsResponseDto, WorkspaceIdRequestDto } from '../../api.types';

const fetchRecentDocuments = async ({ workspaceId }: WorkspaceIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<FetchRecentDocumentsResponseDto>>(
    WORKSPACE_API_END_POINTS.RECENT_DOCUMENTS(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchRecentDocuments;
