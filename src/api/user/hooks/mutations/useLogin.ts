import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login } from '@apis/user/apis/post/login-register-refresh';
import { LOCAL_STORAGE_KEYS } from '@apis/user/constants/local-storage-key.constants';
import { LoginRequestDto } from '@apis/user/types/api.types';

import useLocalStorage from '../useLocalStorage';

export const useLogin = () => {
  const [, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');
  const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, '');

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
