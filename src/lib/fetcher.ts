import { ApiErrorBody } from '@common/types/api.common.types';

import { ApiError } from '@common/errors/ApiError';

import { joinURL } from '@common/utils/join-url.utils';

import { captureApiError } from './sentry';

interface CreateFetcherOptions {
  baseURL?: string;
  headers?: HeadersInit;
  fetchOptions?: RequestInit;
}

interface CustomRequestInit extends RequestInit {
  /**
   * 이 요청에 인증 헤더가 필요한지 여부를 결정합니다.
   * `false`로 설정하면, 환경 변수에 토큰이 있더라도 Authorization 헤더를 보내지 않습니다.
   */
  auth?: boolean;
}

// 정상 응답 처리 함수
const handleResponse = async (res: Response) => {
  return res.json();
};

// 비정상 응답 처리 함수
const handleResponseError = async (res: Response, url: string, requestBodyRaw: unknown) => {
  const contentType = res.headers.get('content-type');
  let requestBody: string;
  const responseBodyText = await res.text();
  let responseBody: ApiErrorBody = {
    isSuccess: false,
    code: 'UNKNOWN',
    message: `❌ API error ${res.status}`,
  };

  // 직렬화 불가 값 처리
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
  throw error;
};

export const createFetcher =
  ({
    baseURL = process.env.NEXT_PUBLIC_SERVER_API_BASE_URL,
    headers,
    fetchOptions,
  }: CreateFetcherOptions = {}) =>
  async <T>(path: string, options?: CustomRequestInit): Promise<T> => {
    if (!baseURL) {
      throw new Error(
        'API baseURL이 누락되었습니다. NEXT_PUBLIC_SERVER_API_BASE_URL 환경 변수를 확인하세요.',
      );
    }

    const url = joinURL(baseURL, path);

    // body가 FormData인지 확인합니다.
    const isFormData = options?.body instanceof FormData;

    // 1. Headers 클래스를 사용해 모든 헤더를 일관되고 안전하게 관리합니다.
    //    (as any 같은 타입 단언 없이 타입 안정성을 지킬 수 있습니다.)
    const mergedHeaders = new Headers(headers);

    // 2. API 호출 시점에 전달된 개별 헤더를 병합합니다.
    //    (이전 헤더를 덮어쓰므로 순서에 상관없이 동작합니다.)
    if (options?.headers) {
      new Headers(options.headers).forEach((value, key) => {
        mergedHeaders.set(key, value);
      });
    }

    // 3. 기본 헤더(Accept, Authorization)를 설정합니다.
    //    (이미 설정된 값이 없다면 기본값을 사용합니다.)
    if (!mergedHeaders.has('Accept')) {
      mergedHeaders.set('Accept', 'application/json');
    }

    const requiresAuth = options?.auth !== false;

    // 인증이 필요하고, 수동으로 설정된 Authorization 헤더가 없으며, 토큰이 존재할 때만 헤더를 추가합니다.
    if (
      requiresAuth &&
      !mergedHeaders.has('Authorization') &&
      process.env.NEXT_PUBLIC_ACCESS_TOKEN
    ) {
      mergedHeaders.set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`);
    }

    // 4. FormData 여부에 따라 Content-Type을 최종적으로 제어합니다.
    if (isFormData) {
      // FormData일 경우, 다른 곳에서 실수로 Content-Type을 설정했더라도
      // 여기서 확실하게 제거하여 브라우저가 자동으로 설정하도록 보장합니다.
      mergedHeaders.delete('Content-Type');
    } else {
      // FormData가 아니면서 Content-Type이 설정되지 않은 경우에만
      // 기본값으로 'application/json'을 설정합니다.
      if (!mergedHeaders.has('Content-Type')) {
        mergedHeaders.set('Content-Type', 'application/json');
      }
    }

    const mergedOptions: RequestInit = {
      ...fetchOptions,
      ...options,
      headers: mergedHeaders,
    };

    try {
      const res = await fetch(url, mergedOptions);

      // 응답 인터셉터
      // 응답 성공시
      if (res.ok) {
        return handleResponse(res);
      }
      // 응답 에러시
      return handleResponseError(res, url, mergedOptions.body);
    } catch (error) {
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
    }
  };

export const defaultApi = createFetcher({ fetchOptions: { cache: 'no-store' } });
