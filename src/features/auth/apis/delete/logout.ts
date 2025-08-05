import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import { AUTH_API_ENDPOINTS } from '@features/auth/constants/api-end-point.constants';

/**
 * AcessToken을 Header에 담아야 합니다.
 */
export const logout = async () => {
  const response = await defaultApi<BaseResponseDto<object>>(AUTH_API_ENDPOINTS.LOGOUT, {
    method: 'DELETE',
    // TODO: fetcher 변경에 따라 수정 필요
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return response;
};
