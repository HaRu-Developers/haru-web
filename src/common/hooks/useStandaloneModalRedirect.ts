'use client';

import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

type Options = {
  /** router.back()을 쓸지 여부 (기본: true) */
  useBack?: boolean;
  /** fallback 이동 방식 (기본: 'push') */
  method?: 'replace' | 'push';
};

/**
 * 바로 닫히는 modal fallback 로직
 *
 * innerWorkspaceId 내에서 쓸 거임
 */
const useStandaloneModalRedirect = (
  getRedirectPath: (workspaceId: string) => string,
  options?: Options,
) => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { useBack = true, method = 'push' } = options ?? {};

  useEffect(() => {
    if (!workspaceId) return;
    const to = getRedirectPath(workspaceId);

    if (!useBack) {
      router[method](to);
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router[method](to);
  }, [router, workspaceId, getRedirectPath, useBack, method]);
};

export default useStandaloneModalRedirect;
