import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { AUTH_API_ENDPOINTS } from '@apis/user/constants/api-end-point.constants';
import { PatchUserInfoRequestDto, UserInfoResponseDto } from '@apis/user/types/api.types';

export const patchUserInfo = async ({ name, password }: PatchUserInfoRequestDto) => {
  const response = await defaultApi<BaseResponseDto<UserInfoResponseDto>>(
    AUTH_API_ENDPOINTS.USER_INFO,
    {
      method: 'PATCH',
      body: JSON.stringify({ name, password }),
    },
  );

  return response;
};
