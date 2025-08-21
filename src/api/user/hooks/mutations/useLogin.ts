'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserInfo } from '@api/user/apis/get/get-user-info';
import { login } from '@api/user/apis/post/login-register-refresh';
import { useGetUserInfo } from '@api/user/hooks/queries/useGetUserInfo';

import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { useAuthStoreActions } from '@features/auth/hooks/useAuthStore';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUser } = useAuthStoreActions();

  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // 'user.detail' 쿼리 키를 가진 데이터를 '만료'시켜,
      // 다른 컴포넌트에서 이 데이터를 사용하는 경우 최신 정보로 다시 가져오도록(refetch) 합니다.
      // (예: 로그인 후 온보딩에 사용자 이름을 표시할 때)
      await queryClient.invalidateQueries(queryKeys.user.detail());
      const userInfo = await queryClient.fetchQuery({
        queryKey: queryKeys.user.detail().queryKey,
        queryFn: getUserInfo,
      });
      setUser(userInfo.result);

      // URL에 'redirect' 쿼리 파라미터가 있는지 확인합니다.
      const redirectPath = searchParams.get('redirect');

      // 'redirect' 파라미터의 존재 여부에 따라 다른 경로로 이동시킵니다.
      if (redirectPath) {
        // redirect 쿼리 파라미터가 있으면 해당 경로로 이동
        router.push(redirectPath);
      } else {
        // 없으면 기본 경로로 이동
        router.push(ROUTES.WORKSPACE_MAIN());
      }
    },

    onError: (err) => {
      console.error('로그인 실패:', err);
      // console.error('에러 상세:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    },
  });
};
