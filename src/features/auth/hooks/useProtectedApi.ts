import { createFetcher } from '@lib/fetcher';

import { useAccessToken } from '@features/auth/hooks/useAuthStore';

import useAuthStore from '@features/auth/stores/auth-store';

export const useProtectedApi = () => {
  const protectedApi = createFetcher({
    fetchOptions: { cache: 'no-store' },
    headers: (() => {
      const envToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      const accessToken = useAuthStore.getState().user?.accessToken;

      // 빈 문자열이 아닌 토큰이 있을 때만 Authorization 헤더 설정
      if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
      }

      // 개발환경 용 : 환경변수에 AT를 따로 설정한 경우, 해당 토큰을 사용하도록 함.
      if (envToken) {
        return { Authorization: `Bearer ${envToken}` };
      }

      // 토큰이 없으면 Authorization 헤더 없음
      return undefined;
    })(),
  });

  return { protectedApi };
};
