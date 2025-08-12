'use client';

import { useAccessToken } from '@features/auth/hooks/useAuthStore';

import { createFetcher } from './fetcher';

/**
 * headers에 Authorization을 자동으로 포함 합니다.
 */
export const protectedApi = createFetcher({
  fetchOptions: { cache: 'no-store' },
  headers: (() => {
    const accessToken = useAccessToken();
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
