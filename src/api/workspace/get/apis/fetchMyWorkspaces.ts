import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { fetchMyWorkspacesResponseDto } from '../../api.types';
import { WORKSPACE_API_ENDPOINTS } from '../../end-point.constants';

const fetchMyWorkspaces = async () => {
  const response = await defaultApi<BaseResponseDto<fetchMyWorkspacesResponseDto>>(
    WORKSPACE_API_ENDPOINTS.MY_WORKSPACE,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMyWorkspaces;
