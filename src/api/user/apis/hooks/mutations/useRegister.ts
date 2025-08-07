import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signup } from '../../post/login-register-refresh';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,

    onSuccess: () => {
      console.log('회원가입 성공. 로그인 페이지로 이동합니다.');
      router.push('/auth/login');
    },

    onError: (err) => {
      console.error('회원가입 실패:', err);
    },
  });
};
