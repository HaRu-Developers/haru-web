'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import { useUser } from '@features/auth/hooks/useAuthStore';

const RootRedirectHandler = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.accessToken) {
      router.push(ROUTES.WORKSPACE_MAIN());
    } else {
      router.push(ROUTES.LANDING);
    }
  }, []);

  return null;
};

export default RootRedirectHandler;
