'use client';

import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

const ChangePasswordStandalonePage = () => {
  const router = useRouter();
  // inner workspace id에서만 /settings/change-password 접근
  const { workspaceId } = useParams<{ workspaceId: string }>();

  useEffect(() => {
    // 이전 히스토리가 있으면 back
    if (window.history.length > 1) {
      router.back();
      return;
    }

    // 없으면 워크스페이스 메인으로
    router.replace(ROUTES.WORKSPACE_MAIN(workspaceId));
  }, [router, workspaceId]);

  return null; // 화면 표시 없음
};

export default ChangePasswordStandalonePage;
