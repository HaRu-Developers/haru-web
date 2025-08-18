'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login } from '@api/user/apis/post/login-register-refresh';

import { ROUTES } from '@common/constants/routes.constants';

import { useAuthStoreActions } from '@features/auth/hooks/useAuthStore';

// import queryKeys from '@common/constants/query-key.constants';

// import { LOCAL_STORAGE_KEYS } from '@api/user/constants/local-storage-key.constants';
//
// import useLocalStorage from '../useLocalStorage';

export const useLogin = () => {
  // const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');
  // const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, '');
  // const queryClient = useQueryClient();
  const router = useRouter();
  const { setAccessToken: setStoreAccessToken, setRefreshToken: setStoreRefreshToken } =
    useAuthStoreActions();

  // const searchParams = useSearchParams();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      // setAccessToken(data.accessToken);
      setStoreAccessToken(data.accessToken);

      // setRefreshToken(data.refreshToken);
      setStoreRefreshToken(data.refreshToken);

      // queryClient.invalidateQueries(queryKeys.user.detail());

      // const redirectPath = searchParams.get('redirect');

      /*
      
      if (redirectPath) {
        // redirect 쿼리 파라미터가 있으면 해당 경로로 이동
        router.push(redirectPath);
      } else {
        // 없으면 기본 경로로 이동
        router.push(ROUTES.WORKSPACE_MAIN());
      }
        */

      router.push(ROUTES.WORKSPACE_MAIN());
    },

    onError: (err) => {
      console.error('로그인 실패:', err);
      // console.error('에러 상세:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    },
  });
};
