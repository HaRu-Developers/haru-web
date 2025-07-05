import { captureApiError } from './sentry';

interface CreateFetcherOptions {
  baseURL?: string;
  headers?: HeadersInit;
  fetchOptions?: RequestInit;
}

export const createFetcher =
  ({
    baseURL = process.env.SERVER_API_BASE_URL,
    headers,
    fetchOptions,
  }: CreateFetcherOptions = {}) =>
  async <T>(path: string, options?: RequestInit): Promise<T> => {
    const url =
      typeof window === 'undefined' ? `${baseURL}${path}` : `${window.location.origin}/${path}`;

    const mergedHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...options?.headers,
    };

    const mergedOptions: RequestInit = {
      ...fetchOptions,
      ...options,
      headers: mergedHeaders,
    };

    try {
      const res = await fetch(url, mergedOptions);

      // 응답 에러 인터셉터
      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        const responseBodyText: string = await res.text(); // fetch의 응답을 텍스트로 변환
        let responseBody: unknown = responseBodyText;

        // JSON 응답이면 파싱
        if (contentType?.includes('application/json')) {
          try {
            responseBody = JSON.parse(responseBodyText);
          } catch (_) {
            // 파싱 실패 시 그대로 유지
          }
        }

        const error = new Error(`API error ${res.status}`);

        // 500번대만 Sentry 전송
        if (res.status >= 500) {
          captureApiError(
            error,
            {
              url,
              status: res.status,
              requestBody: mergedOptions.body,
              responseHeaders: Object.fromEntries(res.headers.entries()),

              responseBody,
            },
            'server-error',
          );
        }

        throw error;
      }

      return res.json();
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

// export const externalApi = createFetcher({
//   fetchOptions: {
//     cache: 'no-store',
//     credentials: 'include',
//   },
// });
