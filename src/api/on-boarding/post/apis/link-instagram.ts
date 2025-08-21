import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_ON_BOARDING_API_ENDPOINTS } from '@/api/on-boarding/api-end-point.constants';
import { LinkInstagramRequestDto, LinkInstagramResponseDto } from '@/api/on-boarding/apis.types';

export const linkInstagram = async ({ workspaceId, instagramRedirectType, code }: LinkInstagramRequestDto) => {
  const query = new URLSearchParams();
  query.append('instagramRedirectType', instagramRedirectType);

  const url = `${WORKSPACES_ON_BOARDING_API_ENDPOINTS.LINK_INSTAGRAM(workspaceId)}?${query.toString()}`;
  const response = await defaultApi<BaseResponseDto<LinkInstagramResponseDto>>(
    url,
    {
      method: 'POST',
      headers: {
        code,
      },
      auth: true,
    },
  );

  return response.result;
};
