import { defaultApi } from '@lib/fetcher';

import { AUTH_API_ENDPOINTS } from '@api/user/constants/api-end-point.constants';
import { SearchUserRequestDto, SearchUserResponseDto } from '@api/user/types/api.types';

import { BaseResponseDto } from '@common/types/api.common.types';

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
