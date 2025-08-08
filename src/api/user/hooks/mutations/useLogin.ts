'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@common/constants/routes.constants';

import { login } from '@apis/user/apis/post/login-register-refresh';
import { LOCAL_STORAGE_KEYS } from '@apis/user/constants/local-storage-key.constants';

import useLocalStorage from '../useLocalStorage';

export const useLogin = () => {
  const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');
  const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, '');
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      router.push(ROUTES.WORKSPACE_MAIN());
    },

    onError: (err) => {
      console.error('로그인 실패:', err);
      // console.error('에러 상세:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    },
  });
};
