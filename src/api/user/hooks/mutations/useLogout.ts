import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { logout } from '@api/user/apis/delete/logout';

import { ROUTES } from '@common/constants/routes.constants';

import { useAuthStoreActions } from '@features/auth/hooks/useAuthStore';

const useLogout = () => {
  const qc = useQueryClient();
  const router = useRouter();
  const { clearTokens } = useAuthStoreActions();

  return useMutation({
    mutationFn: logout,
    // 실패하더라도 클라이언트 토큰은 무조건 제거
    onSettled: async () => {
      // 토큰/유저 정보 삭제 (메모리 + 로컬스토리지)
      clearTokens();

      // 캐시 제거
      try {
        await qc.cancelQueries();
        await qc.clear();
      } catch {
        // 캐시 정리 실패는 무시
      }

      // 보호 페이지로 못 돌아가게 replace 사용
      router.replace(ROUTES.LANDING.BASE);
    },
  });
};

export default useLogout;
