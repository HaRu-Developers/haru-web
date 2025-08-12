import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_ON_BOARDING_API_ENDPOINTS } from '@/api/on-boarding/api-end-point.constants';
import { InviteMembersRequestDto } from '@/api/on-boarding/apis.types';

export const inviteMembers = async ({ workspaceId, emails }: InviteMembersRequestDto) => {
  const response = await defaultApi<BaseResponseDto<object>>(
    WORKSPACES_ON_BOARDING_API_ENDPOINTS.INVITE_MEMBERS,
    {
      method: 'POST',
      body: JSON.stringify({ workspaceId, emails }),
    },
  );

  return response;
};
