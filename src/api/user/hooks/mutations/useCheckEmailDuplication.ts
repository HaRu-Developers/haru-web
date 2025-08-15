import { useMutation } from '@tanstack/react-query';

import { checkEmailDuplication } from '@api/user/apis/post/login-register-refresh';

interface UseCheckEmailDuplicationProps {
  onAvailable: () => void;
  onUnavailable: () => void;
}

export const useCheckEmailDuplication = ({
  onAvailable,
  onUnavailable,
}: UseCheckEmailDuplicationProps) => {
  return useMutation({
    mutationFn: checkEmailDuplication,
    onSuccess: (data) => {
      console.log('이메일 중복 체크 성공:', data);
      if (data === 'AVAILABLE') onAvailable();
      else if (data === 'UNAVAILABLE') onUnavailable();
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
