import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACE_API_END_POINTS } from '../../api-end-point.constants';
import { FetchWorkspaceDetailResponseDto, WorkspaceIdRequestDto } from '../../api.types';

const fetchWorkspaceDetail = async ({ workspaceId }: WorkspaceIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<FetchWorkspaceDetailResponseDto>>(
    WORKSPACE_API_END_POINTS.WORKSPACE_DETAIL(workspaceId),
    {
      method: 'GET',
    },
  );

  return response;
};

export default fetchWorkspaceDetail;
