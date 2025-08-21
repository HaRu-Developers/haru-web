import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserInfo } from '@api/user/apis/get/get-user-info';
import { signupAndLogin } from '@api/user/apis/post/login-register-refresh';
import { LoginResponseDto, SignupAndLoginRequestDto } from '@api/user/types/api.types';

import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAuthStoreActions } from '@features/auth/hooks/useAuthStore';

/**
 * @description 회원가입 및 자동 로그인을 위한 커스텀 Mutation 훅
 */
export const useSignupAndLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUser } = useAuthStoreActions();

  return useMutation<LoginResponseDto, ApiError, SignupAndLoginRequestDto>({
    mutationFn: (variables) => signupAndLogin(variables),

    /**
     * onSuccess 콜백에 'variables' 파라미터를 추가합니다.
     * variables는 mutate 함수에 전달된 SignupAndLoginRequestDto 객체입니다.
     */
    onSuccess: async (data, variables) => {
      // --- 공통 성공 로직 ---
      // 서버로부터 받은 토큰을 Zustand 스토어에 저장합니다.
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // 사용자 정보 쿼리를 무효화하여 최신 정보로 갱신합니다.
      await queryClient.invalidateQueries(queryKeys.user.detail());
      const userInfo = await queryClient.fetchQuery({
        queryKey: queryKeys.user.detail().queryKey,
        queryFn: getUserInfo,
      });
      setUser(userInfo.result);

      // --- 분기 처리 로직 ---
      // mutate 함수에 전달된 'token'의 존재 여부를 확인합니다.
      if (variables.token) {
        // 토큰이 있었던 경우 (초대받은 사용자)
        router.push(ROUTES.MODAL.AUTH.AFTER_REGISTER.INVITED_REGISTER);
      } else {
        // 토큰이 없었던 경우 (일반 가입 사용자)
        router.push(ROUTES.MODAL.AUTH.AFTER_REGISTER.NORMAL_REGISTER);
      }
    },

    onError: (err) => {
      console.error('회원가입 실패:', err);
    },
  });
};
