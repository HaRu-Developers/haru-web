import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginRequestDto } from '@apis/user/api.types';
import { login } from '@apis/user/apis/post/login-register-refresh';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequestDto) => login(data),
    onSuccess: (data) => {},
  });
};
