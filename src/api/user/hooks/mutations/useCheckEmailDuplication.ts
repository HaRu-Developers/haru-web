import { useMutation } from '@tanstack/react-query';

import { checkEmailDuplication, login } from '@apis/user/apis/post/login-register-refresh';

export const useCheckEmailDuplication = () => {
  return useMutation({
    mutationFn: checkEmailDuplication,
    onSuccess: (data) => {
      if (data === 'AVAILABLE') return true;
      else if (data === 'UNAVAILABLE') return false;
      else {
        console.error('이메일 중복 체크 실패: 알 수 없는 상태', data);
        return false;
      }
    },

    onError: (err) => {
      console.error('이메일 중복 체크 실패:', err);
      // console.error('에러 상세:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    },
  });
};
