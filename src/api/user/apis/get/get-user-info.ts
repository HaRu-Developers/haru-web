import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { UserInfoResponseDto } from '@features/auth/types/api.types';

import { AUTH_API_ENDPOINTS } from '@/api/user/api-end-point.constants';

export const getUserInfo = async () => {
  const response = await defaultApi<BaseResponseDto<UserInfoResponseDto>>(
    AUTH_API_ENDPOINTS.USER_INFO,
    {
      method: 'GET',
    },
  );

  return response;
};
