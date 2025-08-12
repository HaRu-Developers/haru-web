import { defaultApi } from '@lib/fetcher';

import { AUTH_API_ENDPOINTS } from '@api/user/constants/api-end-point.constants';
import {
  CheckEmailDuplicationRequestDto,
  CheckEmailDuplicationResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
  SignupRequestDto,
} from '@api/user/types/api.types';

import { BaseResponseDto } from '@common/types/api.common.types';

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

export const checkEmailDuplication = async ({ email }: CheckEmailDuplicationRequestDto) => {
  const response = await defaultApi<BaseResponseDto<CheckEmailDuplicationResponseDto>>(
    AUTH_API_ENDPOINTS.CHECK_EMAIL_DUPLICATION,
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  );

  return response.result.emailStatus;
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

  return response.result;
};
