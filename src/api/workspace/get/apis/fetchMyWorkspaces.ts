import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACE_API_END_POINTS } from '../../api-end-point.constants';
import { FetchMyWorkspacesResponseDto } from '../../api.types';

const fetchMyWorkspaces = async () => {
  const response = await defaultApi<BaseResponseDto<FetchMyWorkspacesResponseDto>>(
    WORKSPACE_API_END_POINTS.MY_WORKSPACE,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMyWorkspaces;
