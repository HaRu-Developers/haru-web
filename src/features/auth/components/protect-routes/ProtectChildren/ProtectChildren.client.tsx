'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import { useAuthStoreActions, useUser } from '@features/auth/hooks/useAuthStore';

import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';

const ProtectChildren = ({
  children,
  protectMode,
  whitelist = [],
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
  whitelist?: string[];
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
  // 1. 현재 경로가 화이트리스트에 있는지 먼저 확인합니다.
  const isWhitelisted = whitelist.includes(pathName);

  // 2. 화이트리스트에 없다면, 그때 protectMode에 따라 접근 차단 여부를 결정합니다.
  const isBlockedAccess = isWhitelisted
    ? false // 화이트리스트에 있으면 절대 차단하지 않음
    : protectMode
      ? !isUserAuthenticated // protectMode: true => 로그인 안 한 사용자 차단
      : isUserAuthenticated; // protectMode: false => 로그인 한 사용자 차단

  // 2. 컴포넌트가 클라이언트에서 마운트되면 isMounted를 true로 설정
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // console.log('[PROTECT_ROUTE] CURRENT PATH :', pathName);
    // console.log('[PROTECT_ROUTE] IS IN WHITELIST :', whitelist.includes(pathName), whitelist);
  }, [pathName, whitelist]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (isBlockedAccess) {
      if (protectMode) {
        // 로그인하지 않은 사용자는 접근할 수 없는 페이지
        // console.log(
        //   `[PROTECT_ROUTE] 로그인하지 않은 사용자는 접근할 수 없는 페이지 [ ${window.location.href} ]입니다. 로그인 페이지로 이동합니다.`,
        // );
        clearUser();
        return router.replace(ROUTES.AUTH.LOGIN);
      } else {
        // 로그인한 사용자는 접근할 수 없는 페이지
        // 로그인한 사용자는 접근할 수 없는 페이지
        // console.log(
        //   `[PROTECT_ROUTE] 로그인되어 있는 사용자는 접근할 수 없는 페이지 [ ${window.location.href} ] 입니다. 로그인 페이지로 이동합니다.`,
        // );
        if (handleBlockedAccess) {
          return handleBlockedAccess();
        }
        return router.push(ROUTES.WORKSPACE_MAIN());
      }
    }
  }, [clearUser, handleBlockedAccess, isBlockedAccess, isMounted, protectMode, router]);

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
