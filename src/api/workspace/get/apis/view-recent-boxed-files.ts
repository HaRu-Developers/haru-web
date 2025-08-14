import { defaultApi } from '@lib/fetcher';

import { WORKSPACE_API_END_POINTS } from '@api/workspace/api-end-point.constants';

import { BaseResponseDto } from '@common/types/api.common.types';

import { ViewRecentBoxedFilesRequestDto, ViewRecentBoxedFilesResponseDto } from '../../api.types';

export const viewRecentBoxedFiles = async ({ workspaceId }: ViewRecentBoxedFilesRequestDto) => {
  const response = await defaultApi<BaseResponseDto<ViewRecentBoxedFilesResponseDto>>(
    WORKSPACE_API_END_POINTS.RECENT_BOXED_FILES(workspaceId),
    {
      method: 'GET',
    },
  );

  return response.result;
};
