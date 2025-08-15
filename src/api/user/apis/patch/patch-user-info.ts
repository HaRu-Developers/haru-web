import { defaultApi } from '@lib/fetcher';

import { AUTH_API_ENDPOINTS } from '@api/user/constants/api-end-point.constants';
import { PatchUserInfoRequestDto, UserInfoResponseDto } from '@api/user/types/api.types';

import { BaseResponseDto } from '@common/types/api.common.types';

export const patchUserInfo = async ({ name, password }: PatchUserInfoRequestDto) => {
  const response = await defaultApi<BaseResponseDto<UserInfoResponseDto>>(
    AUTH_API_ENDPOINTS.USER_INFO,
    {
      method: 'PATCH',
      body: JSON.stringify({ name, password }),
      auth: true,
    },
  );

  return response;
};
