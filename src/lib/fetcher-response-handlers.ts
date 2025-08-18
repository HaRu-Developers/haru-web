import { captureApiError } from '@lib/sentry';

import { AUTH_API_ENDPOINTS } from '@api/user/constants/api-end-point.constants';
import { RefreshAccessTokenResponseDto } from '@api/user/types/api.types';

import { ApiErrorBody, BaseResponseDto } from '@common/types/api.common.types';

import { ApiError } from '@common/errors/ApiError';

import { joinURL } from '@common/utils/join-url.utils';

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
 *  어떤 에러를 Sentry로 보낼지 정책
 */
export const shouldReportToSentry = (status: number) => {
  // 서버오류/네트워크 오류만 전송, 비즈니스 4xx는 제외
  if (status >= 500 || status === 0) return true;

  // 특정 4xx 코드는 무시
  // const ignoreCodes = new Set(['LASTOPENED4001']);
  // if (ignoreCodes.has(code)) return false;

  return false;
};

/**
 * 응답은 받았으나, 에러인 경우 응답 처리 함수
 */
export const handleResponseError = async (
  res: Response,
  url: string,
  requestBodyRaw: unknown,
  method?: string,
) => {
  const contentType = res.headers.get('content-type');
  const rawText = await res.text();

  // requestBody 직렬화 (로깅용)
  let requestBody = '';
  try {
    requestBody =
      typeof requestBodyRaw === 'string' ? requestBodyRaw : JSON.stringify(requestBodyRaw);
  } catch {
    // 직렬화 불가 값 처리
    requestBody = '[Non-serializable body]';
  }

  // JSON만 파싱
  let responseBody: ApiErrorBody = {
    isSuccess: false,
    code: 'UNKNOWN',
    message: `API error ${res.status}`,
  };
  if (contentType?.includes('application/json')) {
    try {
      responseBody = JSON.parse(rawText) as ApiErrorBody;
    } catch {
      // 파싱 실패시 문자열 유지
    }
  }

  // 공통 에러 객체 생성
  const error = new ApiError({
    status: res.status,
    message: responseBody.message,
    code: responseBody.code,
    body: responseBody,
    rawText,
    url,
    method,
  });

  if (shouldReportToSentry(res.status)) {
    captureApiError(
      error,
      {
        url,
        method,
        status: res.status,
        requestBody,
        responseHeaders: Object.fromEntries(res.headers.entries()),
        responseBody,
      },
      'server-error',
    );
  }
  throw error;
};

export const refreshAccessToken = async () => {
  const { user, actions } = useAuthStore.getState();

  const { setUserId, setAccessToken, setRefreshToken, clearTokens } = actions;
  const { accessToken, refreshToken } = user ?? {};

  console.log('[fetcher.ts] 토큰 갱신 요청을 시작합니다.', {
    accessToken,
    refreshToken,
  });

  if (!refreshToken || !accessToken) {
    clearTokens();
    throw new Error('NO ACCESS TOKEN OR REFRESH TOKEN AVAILABLE');
  }

  const baseURL = process.env.NEXT_PUBLIC_SERVER_API_BASE_URL;
  if (!baseURL) {
    throw new Error(
      'API baseURL이 누락되었습니다. NEXT_PUBLIC_SERVER_API_BASE_URL 환경 변수를 확인하세요.',
    );
  }

  const safeUrl = joinURL(baseURL, AUTH_API_ENDPOINTS.REFRESH_TOKEN);

  const res = await fetch(safeUrl, {
    method: 'POST',
    headers: {
      RefreshToken: refreshToken,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    // 토큰 갱신 실패 시, 토큰을 초기화합니다.
    clearTokens();
    throw new ApiError({
      status: res.status,
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
