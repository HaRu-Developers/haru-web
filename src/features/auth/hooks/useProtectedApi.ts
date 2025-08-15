import { createFetcher } from '@lib/fetcher';

import { useAccessToken } from '@features/auth/hooks/useAuthStore';

export const useProtectedApi = () => {
  const accessToken = useAccessToken();

  const protectedApi = createFetcher({
    fetchOptions: { cache: 'no-store' },
    headers: (() => {
      const envToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

      // 빈 문자열이 아닌 토큰이 있을 때만 Authorization 헤더 설정
      if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
      }

      if (envToken) {
        return { Authorization: `Bearer ${envToken}` };
      }

      // 토큰이 없으면 Authorization 헤더 없음
      return undefined;
    })(),
  });

  return { protectedApi };
};
