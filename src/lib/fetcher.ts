import {
  handleFetchError,
  handleResponse,
  handleResponseError,
  refreshAccessToken,
} from '@lib/fetcher-response-handlers';

import { joinURL } from '@common/utils/join-url.utils';

import useAuthStore from '@features/auth/stores/auth-store';

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

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Custom Fetcher 함수 구현입니다.
 *
 * 고차 함수 형태로, fetch 요청을 보내는 async 함수를 반환합니다.
 *
 * @returns API 요청을 보내는 함수
 */
export const createFetcher = ({
  baseURL = process.env.NEXT_PUBLIC_SERVER_API_BASE_URL,
  headers,
  fetchOptions,
}: CreateFetcherOptions = {}) =>
  /**
   * createFetcher가 최종적으로 반환하는 fetcher 함수
   * @param path - API Request 경로 입니다.
   * @param options - fetch 함수에 전달되는 options
   */
  async function innerFunction<T>(path: string, options?: CustomRequestInit): Promise<T> {
    // Zustand Auth Store를 활용합니다.
    const { user } = useAuthStore.getState();
    const { accessToken } = user ?? {};

    if (!baseURL) {
      throw new Error(
        'API baseURL이 누락되었습니다. NEXT_PUBLIC_SERVER_API_BASE_URL 환경 변수를 확인하세요.',
      );
    }

    // 안전한 URL 생성
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

    // TODO: PRODUCTION 환경에서는 삭제해야 합니다. by. @kyeoungwoon

    // options에 auth를 설정한 경우에만 true
    const requiresAuth = options?.auth ?? false;

    // 인증이 필요하고, 수동으로 설정된 Authorization 헤더가 없으며, 토큰이 존재할 때만 헤더를 추가합니다.
    if (requiresAuth && !mergedHeaders.has('Authorization')) {
      // accessToken이 존재하는 경우 Authorization 헤더를 설정합니다.
      if (accessToken) {
        mergedHeaders.set('Authorization', `Bearer ${accessToken}`);
      }

      // NODE_ENV가 test이고, NEXT_PUBLIC_ACCESS_TOKEN을 설정해둔 경우에는
      // .env 안에 있는 값으로 덮어서 사용하도록 합니다.
      // NODE_ENV: "development" | "production" | "test"
      if (process.env.NODE_ENV === 'test' && process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
        mergedHeaders.set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`);
      }
    }

    // TODO: axios 기준, withCredentials 옵션을 사용해야 합니다.
    // localStorage나, cookie에 저장된 credentials를 loading 할 수 있도록 ..
    // HaRu에서는 cookie 기반 인증을 사용하지 않습니다.

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

    /**
     * fetch API를 호출할 때 사용할 최종 옵션 객체를 생성합니다.
     */
    const mergedOptions: RequestInit = {
      ...fetchOptions,
      ...options,
      headers: mergedHeaders,
    };

    try {
      const res = await fetch(url, mergedOptions);

      // 응답 인터셉터 - 우선 서버로부터 응답이 오긴 한 경우.

      // 응답 성공시
      if (res.ok) {
        return handleResponse(res);
      }
      // 응답 에러시
      // access token 만료 시 자동으로 재발급하도록 함
      // clone에서만 JSON 확인 (원본 res는 아직 미소비)
      let resBody: { code?: string } = {};
      try {
        const ct = res.headers.get('content-type') ?? '';
        if (ct.includes('application/json')) {
          resBody = await res.clone().json(); // clone
          console.log('[fetcher.ts] 응답 JSON:', resBody);
        }
      } catch {
        // JSON이 아니거나 파싱 실패 → 무시
      }

      // TODO: RT 만료 시에는 로그인 페이지로 이동 시켜야 함 !
      if (res.status === 401 && resBody.code === 'AUTHORIZATION4002') {
        console.log('AT 만료로 RT 재발급 요청을 합니다.');
        let newAccessToken: string | null = null;
        // refresh 중복 방지
        if (!refreshPromise) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken()
            .catch((err) => {
              console.error('Access token refresh failed:', err);
              throw err;
            })
            .finally(() => {
              refreshPromise = null;
              isRefreshing = false;
            });
        }

        newAccessToken = await refreshPromise;
        mergedHeaders.set('Authorization', `Bearer ${newAccessToken}`);

        // 다시 한 번 실행
        // fetchOptions 유지
        const retryOptions: RequestInit = { ...fetchOptions, ...options, headers: mergedHeaders };

        try {
          const newRes = await fetch(url, retryOptions);
          if (newRes.ok) {
            return handleResponse(newRes); // 성공 시 여기서만 소비
          }
          //  재시도도 실패한 경우, newRes를 에러 핸들러로
          return handleResponseError(
            newRes,
            url,
            retryOptions.body,
            retryOptions.method as string | undefined,
          );
        } catch (error) {
          return handleFetchError(error);
        }
      }

      // 일반 에러: 원본 res를 처음으로 읽게 함
      return handleResponseError(
        res,
        url,
        mergedOptions.body,
        mergedOptions.method as string | undefined,
      );
    } catch (error) {
      // 네트워크 오류나 기타 예외 처리
      return handleFetchError(error);
    }
  };

/**
 * 기본 fetcher 함수입니다.
 *
 * auth 옵션을 true로 설정하면, Authorization 헤더를 자동으로 추가합니다.
 * @example
 * ```typescript
 * const data = await defaultApi<ApiResponseDto>('/api/some-endpoint', { auth: true });
 * ```
 */
export const defaultApi = createFetcher({ fetchOptions: { cache: 'no-store' } });

/**
 * axios의 withCredentials를 사용한 것과 동일한 효과를 가진 fetcher입니다.
 * @deprecated  HaRu BE에는 header를 통한 인증만 있기에 사실상 필요는 없습니다.
 */
export const withCredentialsApi = createFetcher({
  fetchOptions: { cache: 'no-store', credentials: 'include' },
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
});
