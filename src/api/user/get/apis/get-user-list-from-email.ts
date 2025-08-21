import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { UserListFromEmailResponseDto } from '../../api.types';
import { USER_API_ENDPOINTS } from '../../end-point.constants';

export const getUserListFromEmail = async (email: string) => {
  const url = `${USER_API_ENDPOINTS.USER_LIST}?email=${encodeURIComponent(email)}`;
  const response = await defaultApi<BaseResponseDto<UserListFromEmailResponseDto>>(url, {
    method: 'GET',
    auth: true,
  });

  return response;
};
