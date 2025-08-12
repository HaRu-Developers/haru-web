import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { fetchUpdateUserResquestDto, fetchUserResponseDto } from '../../api.types';
import { USER_API_ENDPOINTS } from '../../end-point.constants';

export const fetchUserEdit = async ({ name, password }: fetchUpdateUserResquestDto) => {
  const response = await defaultApi<BaseResponseDto<fetchUserResponseDto>>(
    USER_API_ENDPOINTS.USER_EDIT(),
    {
      method: 'PATCH',
      body: JSON.stringify({ name, password }),
      auth: true,
    },
  );

  return response;
};
