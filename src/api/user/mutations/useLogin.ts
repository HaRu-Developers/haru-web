import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginRequestDto } from '@features/auth/types/api.types';

import { login } from '@/api/user/apis/post/login-register-refresh';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequestDto) => login(data),
    onSuccess: (data) => {},
  });
};
