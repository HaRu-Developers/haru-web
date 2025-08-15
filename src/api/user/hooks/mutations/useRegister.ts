import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@common/constants/routes.constants';

import { signup } from '../../apis/post/login-register-refresh';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      console.log('회원가입 성공. 로그인 페이지로 이동합니다.');
      // TODO: 초대된 가입일 경우 변경하여야 함
      router.push(ROUTES.MODAL.AUTH.AFTER_REGISTER.NORMAL_REGISTER);
      // router.push(ROUTES.MODAL.AUTH.AFTER_REGISTER.INVITED_REGISTER);
    },

    onError: (err) => {
      console.error('회원가입 실패:', err);
    },
  });
};
