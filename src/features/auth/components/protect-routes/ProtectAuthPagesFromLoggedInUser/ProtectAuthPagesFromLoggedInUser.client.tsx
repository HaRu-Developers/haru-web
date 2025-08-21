'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import { useAuthStoreActions, useUser } from '@features/auth/hooks/useAuthStore';

import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';

const ProtectChildren = ({
  children,
  protectMode,
  whiteList = [],
  handleBlockedAccess,
}: {
  children?: React.ReactNode;
  /**
   * @description 로그인 한 사용자를 막을 것인지, 안 한 사용자를 막을 것인지 결정
   *
   * @true 로그인하지 않은 사용자는 접근할 수 없는 페이지
   *
   * @false 로그인한 사용자는 접근할 수 없는 페이지
   */
  protectMode: boolean;
  whiteList?: string[];
  handleBlockedAccess?: () => void;
}) => {
  const pathName = usePathname();

  // protectedMode : true => 로그인하지 않은 사용자는 접근할 수 없음
  // protectedMode : false => 로그인한 사용자는 접근할 수 없음

  const router = useRouter();
  const user = useUser();
  const { clearUser } = useAuthStoreActions();

  // 1. 클라이언트에서 하이드레이션이 완료되었는지 추적하는 상태
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const isUserAuthenticated = !!user?.accessToken;
  const isBlockedAccess = protectMode ? !isUserAuthenticated : isUserAuthenticated;

  // 2. 컴포넌트가 클라이언트에서 마운트되면 isMounted를 true로 설정
  useEffect(() => {
    console.log(pathName);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (isBlockedAccess) {
      if (protectMode) {
        // 로그인하지 않은 사용자는 접근할 수 없는 페이지
        console.log(
          `[PROTECT_ROUTE] 로그인하지 않은 사용자는 접근할 수 없는 페이지 [ ${window.location.href} ]입니다. 로그인 페이지로 이동합니다.`,
        );
        clearUser();
        return router.replace(ROUTES.AUTH.LOGIN);
      } else {
        // 로그인한 사용자는 접근할 수 없는 페이지
        // 로그인한 사용자는 접근할 수 없는 페이지
        console.log(
          `[PROTECT_ROUTE] 로그인되어 있는 사용자는 접근할 수 없는 페이지 [ ${window.location.href} ] 입니다. 로그인 페이지로 이동합니다.`,
        );
        if (handleBlockedAccess) {
          return handleBlockedAccess();
        }
        return router.push(ROUTES.WORKSPACE_MAIN());
      }
    }
  }, [clearUser, handleBlockedAccess, isBlockedAccess, isMounted, protectMode, router]);

  if (whiteList.includes(pathName)) {
    // 화이트리스트에 포함된 경로는 보호하지 않음
    return <>{children}</>;
  }

  if (!isMounted || isBlockedAccess) {
    return (
      <>
        <TeamMoodTrackerPageSkeleton />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectChildren;
