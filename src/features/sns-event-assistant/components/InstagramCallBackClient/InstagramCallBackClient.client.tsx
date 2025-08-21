'use client';

import { useEffect } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { useWorkspaceIdStore } from '@common/hooks/stores/useWorkspaceIdStore';

import { OnboardingToastType } from '@features/on-boarding/types/OnboardingToast.types';

import { useOnboardingToastActions } from '@features/on-boarding/hooks/stores/useOnboardingToastStore';

import { useLinkInstagramMutation } from '@/api/on-boarding/post/mutations/useLinkInstagramMutation';
import { InstagramRedirectType } from '@common/types/instagram.enum.types';

const InstagramCallBackClient = () => {
  const instagramRedirectType = InstagramRedirectType.WORKSPACE;
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { workspaceId } = useWorkspaceIdStore();
  const { showOnboardingToast } = useOnboardingToastActions();
  const { mutate: linkInstagram } = useLinkInstagramMutation();

  useEffect(() => {
    // ✅ 1. workspaceId가 아직 복원되지 않았다면, 아무것도 하지 않고 실행을 종료
    //    상태가 복원되어 workspaceId가 생기면, 이 useEffect는 다시 실행됩니다.
    if (!workspaceId) {
      console.error('workspaceId 없음');
      return;
    }

    const code = searchParams.get('code');

    // ✅ 2. 이제 이 조건문은 workspaceId가 확실히 있을 때만 평가됨
    if (!code) {
      // workspaceId 조건은 위에서 이미 확인했으므로 제거 가능
      console.error('인증 코드가 없습니다.');
      router.push(ROUTES.MODAL.SETTING.WORKSPACE_SETTING(workspaceId));
      return;
    }

    linkInstagram(
      { workspaceId, instagramRedirectType, code },
      {
        onSuccess: (data) => {
          // 1. 연동 시 쿼리 클라이언트 제거
          queryClient.invalidateQueries({
            queryKey: queryKeys.snsEventAssistant.instagram(workspaceId).queryKey,
          });
          // 2. 성공 토스트 띄우기
          showOnboardingToast({
            type: OnboardingToastType.SUCCESS_SNS_ACCOUNT,
            snsAccount: data.instagramAccountName,
          });
          // 3. 온보딩 페이지로 복귀
          router.push(ROUTES.MODAL.SETTING.WORKSPACE_SETTING(workspaceId));
        },
      },
    );
  }, [searchParams, workspaceId, router, linkInstagram, showOnboardingToast, queryClient]);

  // 이 페이지는 사용자에게 보이지 않으므로 간단한 로딩 표시만 함
  // 추후 스타일링 필요 (?)
  return <div>인스타그램 계정을 연동 중입니다...</div>;
};

export default InstagramCallBackClient;
