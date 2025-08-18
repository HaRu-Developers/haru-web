'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

/**
 * 뒤로 가는 함수
 *
 * router.back()을 먼저 시도하고,
 * 없으면 from 쿼리나,
 * sessionStorage에 저장해둔 마지막 경로로 replace()
 */
const useSmartClose = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const search = useSearchParams();

  const close = () => {
    const fromQuery = search?.get('from');
    const saved = workspaceId ? sessionStorage.getItem(`lastRoute:${workspaceId}`) : null;

    /**
     * 같은 워크스페이스 경로만 허용 - 보안 위해
     *
     * /workspace/[workspaceId], 혹은 그 하위 경로(/workspace/[workspaceId]/...)만 허용
     */
    const isSafe = (p?: string | null) =>
      !!p && new RegExp(`^/workspace/${workspaceId}(?:/|\\?|#|$)`).test(p);

    // 1) 히스토리가 충분하면 우선 back (앱 내에서 열린 모달 케이스)
    if (window.history.length > 1) {
      console.log('히스트리 있음');
      router.back();
      return;
    }

    // 2) from 쿼리 우선
    if (isSafe(fromQuery)) {
      console.log('from 있음');
      router.replace(fromQuery!);
      return;
    }

    // 3) 세션 저장 경로
    if (isSafe(saved)) {
      console.log('session 있음');
      router.replace(saved!);
      return;
    }

    // 4) 여기까지 오면 워크스페이스 메인으로
    if (workspaceId) router.replace(ROUTES.WORKSPACE_MAIN(workspaceId));
    else router.replace(ROUTES.LANDING);
  };

  return close;
};

export default useSmartClose;
