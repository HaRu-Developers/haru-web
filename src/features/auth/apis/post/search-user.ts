import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import { SearchUserRequestDto, SearchUserResponseDto } from '@features/auth/types/api.types';

import { AUTH_API_ENDPOINTS } from '@features/auth/constants/api-end-point.constants';

export const searchUser = async ({ email }: SearchUserRequestDto) => {
  const response = await defaultApi<BaseResponseDto<SearchUserResponseDto[]>>(
    AUTH_API_ENDPOINTS.SEARCH_USER,
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  );

  return response;
};
