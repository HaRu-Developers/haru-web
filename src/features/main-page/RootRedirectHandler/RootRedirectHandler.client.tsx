'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ProtectChildren from '@features/auth/components/protect-routes/ProtectChildren/ProtectChildren.client';

const RootRedirectHandler = () => {
  const router = useRouter();
  return (
    <ProtectChildren
      protectMode={false} // 로그인한 사용자는 접근할 수 없는 페이지
      handleBlockedAccess={() => router.replace(ROUTES.LANDING)}
    />
  );
};

export default RootRedirectHandler;
