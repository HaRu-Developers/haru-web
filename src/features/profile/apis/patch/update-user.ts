import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import { UpdateUserRequestDto, UserResponseDto } from '@features/profile/types/apis.types';

import { API_ENDPOINTS } from '@features/profile/constants/end-point.constants';

export const updateUser = async ({
  name,
  password, // password 현재 벡에서 지원 안함
}: UpdateUserRequestDto): Promise<BaseResponseDto<UserResponseDto>> => {
  const response = await defaultApi<BaseResponseDto<UserResponseDto>>(API_ENDPOINTS.UPDATE_USER, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  return response;
};
