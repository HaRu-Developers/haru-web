import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { AUTH_API_ENDPOINTS } from '@apis/user/constants/api-end-point.constants';
import { SearchUserRequestDto, SearchUserResponseDto } from '@apis/user/types/api.types';

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
