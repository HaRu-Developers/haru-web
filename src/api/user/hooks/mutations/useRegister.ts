import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@common/constants/routes.constants';

import { signup } from '../../apis/post/login-register-refresh';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      // TODO: 원래는 모달 띄워야 함
      console.log('회원가입 성공. 로그인 페이지로 이동합니다.');
      // router.push(ROUTES.MODAL.AUTH.AFTER_REGISTER.NORMAL_REGISTER);
      router.push(ROUTES.MODAL.AUTH.AFTER_REGISTER.INVITED_REGISTER);
    },

    onError: (err) => {
      console.error('회원가입 실패:', err);
    },
  });
};
