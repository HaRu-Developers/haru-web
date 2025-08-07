import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { AUTH_API_ENDPOINTS } from '@apis/user/constants/api-end-point.constants';
import { UserInfoResponseDto } from '@apis/user/types/api.types';

export const getUserInfo = async () => {
  const response = await defaultApi<BaseResponseDto<UserInfoResponseDto>>(
    AUTH_API_ENDPOINTS.USER_INFO,
    {
      method: 'GET',
    },
  );

  return response;
};
