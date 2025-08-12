import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_ON_BOARDING_API_ENDPOINTS } from '@/api/on-boarding/api-end-point.constants';
import { LinkInstagramRequestDto, LinkInstagramResponseDto } from '@/api/on-boarding/apis.types';

export const linkInstagram = async ({ workspaceId, code }: LinkInstagramRequestDto) => {
  const response = await defaultApi<BaseResponseDto<LinkInstagramResponseDto>>(
    WORKSPACES_ON_BOARDING_API_ENDPOINTS.LINK_INSTAGRAM(workspaceId),
    {
      method: 'POST',
      headers: {
        code,
      },
    },
  );

  return response.result;
};
