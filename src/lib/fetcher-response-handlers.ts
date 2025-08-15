import { captureApiError } from '@lib/sentry';

import { AUTH_API_ENDPOINTS } from '@api/user/constants/api-end-point.constants';
import { RefreshAccessTokenResponseDto } from '@api/user/types/api.types';

import { ApiErrorBody, BaseResponseDto } from '@common/types/api.common.types';

import { ApiError } from '@common/errors/ApiError';

import useAuthStore from '@features/auth/stores/auth-store';

/**
 * 정상 응답 처리 함수
 *
 * 응답이 성공적인 경우 JSON으로 변환해서 반환하도록 합니다
 */
export const handleResponse = async (res: Response) => {
  return res.json();
};
/**
 * 응답은 받았으나, 에러인 경우 응답 처리 함수
 */
export const handleResponseError = async (res: Response, url: string, requestBodyRaw: unknown) => {
  const contentType = res.headers.get('content-type');

  let requestBody: string;
  // serializable 하지 않을 것을 대비하여 res.json()으로 바로 변환하지 않습니다.
  const responseBodyText = await res.text();

  // 기본 응답 본문을 ApiErrorBody 타입으로 초기화합니다.
  let responseBody: ApiErrorBody = {
    isSuccess: false,
    code: 'UNKNOWN',
    message: `❌ API error ${res.status}`,
  };

  // Serialize가 불가능할 경우를 handling 합니다.
  try {
    requestBody =
      typeof requestBodyRaw === 'string' ? requestBodyRaw : JSON.stringify(requestBodyRaw);
  } catch {
    requestBody = '[Non-serializable body]';
  }

  // JSON인 경우에만 파싱 시도
  if (contentType?.includes('application/json')) {
    try {
      responseBody = JSON.parse(responseBodyText) as ApiErrorBody;
    } catch (_error) {
      // 파싱 실패시 문자열 유지
    }
  }

  const error = new ApiError(res.status, responseBody);

  if (res.status >= 500) {
    captureApiError(
      error,
      {
        url,
        status: res.status,
        requestBody,
        responseHeaders: Object.fromEntries(res.headers.entries()),
        responseBody,
      },
      'server-error',
    );
  }

  // ERROR 응답이 온 경우에는 return이 아니라 무조건 throw 하도록 함
  throw error;
};

export const refreshAccessToken = async () => {
  const { user, actions } = useAuthStore.getState();
  const { setUserId, setAccessToken, setRefreshToken, clearTokens } = actions;
  const { accessToken, refreshToken } = user ?? {};

  if (!refreshToken) {
    clearTokens();
    throw new Error('NO REFRESH TOKEN AVAILABLE');
  }

  const res = await fetch(AUTH_API_ENDPOINTS.REFRESH_TOKEN, {
    method: 'POST',
    headers: {
      RefreshToken: refreshToken,
    },
  });

  if (!res.ok) {
    // 토큰 갱신 실패 시, 토큰을 초기화합니다.
    clearTokens();
    throw new ApiError(res.status, {
      isSuccess: false,
      code: 'TOKEN_REFRESH_FAILED',
      message: 'Failed to refresh access token',
    });
  }

  const data: BaseResponseDto<RefreshAccessTokenResponseDto> = await res.json();

  setUserId(data.result.userId);
  setAccessToken(data.result.accessToken);
  setRefreshToken(data.result.refreshToken);

  return data.result.accessToken;
};

export const handleFetchError = (error: unknown) => {
  // 네트워크 관련 오류 Sentry에 전송

  // - fetch 자체가 실패한 경우 (인터넷 연결 끊김, DNS 오류, CORS 등)
  // - 연결 지연으로 인한 timeout
  if (
    error instanceof Error &&
    (error.message.includes('Failed to fetch') ||
      error.message.includes('timeout') ||
      error.message.includes('NetworkError'))
  ) {
    captureApiError(error, undefined, 'network-error');
    // 그 외 예상치 못한 시스템 오류 Sentry에 전송
    // 다음의 사용자가 의도적으로 취소한 요청은 제외:
    // - AbortError: 사용자가 fetch를 중단
    // - canceled: AbortController나 빠른 네비게이션 등으로 요청 취소
    // - Navigation aborted: Next.js 내부 요청 취소
  } else if (
    error instanceof Error &&
    // 넘어감 목록
    !error.message.includes('AbortError') &&
    !error.message.includes('canceled') &&
    !error.message.includes('Navigation aborted')
  ) {
    captureApiError(error, undefined, 'unknown-error');
  }

  throw error;
};
