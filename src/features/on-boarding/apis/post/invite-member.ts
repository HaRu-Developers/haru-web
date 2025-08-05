import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { InviteMembersRequestDto } from '@features/on-boarding/types/apis.types';

import { API_ENDPOINTS } from '@features/on-boarding/constants/end-point.constants';

export const inviteMembers = async ({
  workspaceId,
  emails,
}: InviteMembersRequestDto): Promise<BaseResponseDto<object>> => {
  const response = await defaultApi<BaseResponseDto<object>>(API_ENDPOINTS.INVITE_MEMBERS, {
    method: 'POST',
    body: JSON.stringify({ workspaceId, emails }),
  });

  return response;
};
