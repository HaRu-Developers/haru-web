import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
  SignupRequestDto,
} from '@features/auth/types/api.types';

import { AUTH_API_ENDPOINTS } from '@/api/user/api-end-point.constants';

export const signup = async ({ email, password, name, marketingAgreed }: SignupRequestDto) => {
  const response = await defaultApi<BaseResponseDto<object>>(AUTH_API_ENDPOINTS.SIGN_UP, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      name,
      marketingAgreed,
    }),
  });

  return response;
};

/**
 * AccessToken을 갱신합니다.
 *
 * 구현해둔 Custom Fetcher에서 withCredentials를 구현해야 합니다.
 */
export const refreshAccessToken = async ({ refreshToken }: RefreshAccessTokenRequestDto) => {
  const response = await defaultApi<BaseResponseDto<RefreshAccessTokenResponseDto>>(
    AUTH_API_ENDPOINTS.REFRESH_TOKEN,
    {
      method: 'POST',
      headers: {
        RefreshToken: refreshToken,
      },
    },
  );

  return response;
};

export const login = async ({ email, password }: LoginRequestDto) => {
  const response = await defaultApi<BaseResponseDto<LoginResponseDto>>(AUTH_API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response;
};
