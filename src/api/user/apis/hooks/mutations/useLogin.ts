import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginRequestDto } from '@apis/user/api.types';
import { login } from '@apis/user/apis/post/login-register-refresh';

import useLocalStorage from '../useLocalStorage';

export const useLogin = () => {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', '');

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },

    onError: (err) => {
      console.error('로그인 실패:', err);
    },
  });
};
