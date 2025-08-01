import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import { UserResponseDto } from '@features/profile/types/apis.types';

import { API_ENDPOINTS } from '@features/profile/constants/end-point.constants';

export const readUser = async (): Promise<BaseResponseDto<UserResponseDto>> => {
  const response = await defaultApi<BaseResponseDto<UserResponseDto>>(API_ENDPOINTS.READ_USER, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  return response;
};
