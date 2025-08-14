'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import { useAuthStoreActions } from '@features/auth/hooks/useAuthStore';

// import { LOCAL_STORAGE_KEYS } from '@api/user/constants/local-storage-key.constants';

// import useLocalStorage from '@api/user/hooks/useLocalStorage';

interface GoogleLoginSuccessProps {
  accessToken: string;
  refreshToken: string;
}

const GoogleLoginSuccess = ({ accessToken, refreshToken }: GoogleLoginSuccessProps) => {
  // const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');
  // const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, '');
  const { setAccessToken, setRefreshToken } = useAuthStoreActions();

  const router = useRouter();

  useEffect(() => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    router.push(ROUTES.WORKSPACE_MAIN());
  }, []);

  return null;
};

export default GoogleLoginSuccess;
