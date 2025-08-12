import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { fetchUserResponseDto } from '../../api.types';
import { USER_API_ENDPOINTS } from '../../end-point.constants';

export const fetchUserDetail = async () => {
  const response = await defaultApi<BaseResponseDto<fetchUserResponseDto>>(
    USER_API_ENDPOINTS.USER_DETAIL(),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
