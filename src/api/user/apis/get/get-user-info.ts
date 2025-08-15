import { defaultApi } from '@lib/fetcher';

import { AUTH_API_ENDPOINTS } from '@api/user/constants/api-end-point.constants';
import { UserInfoResponseDto } from '@api/user/types/api.types';

import { BaseResponseDto } from '@common/types/api.common.types';

/**
 *
 * @example
 * ```json
 * {
 *   "isSuccess": true,
 *   "code": "COMMON200",
 *   "message": "성공입니다.",
 *   "result": {
 *     "id": 17,
 *     "email": "umc.cau@gmail.com",
 *     "imageUrl": null,
 *     "name": "UMC중앙대학교"
 *   }
 * }
 * ```
 */
export const getUserInfo = async () => {
  const response = await defaultApi<BaseResponseDto<UserInfoResponseDto>>(
    AUTH_API_ENDPOINTS.USER_INFO,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
