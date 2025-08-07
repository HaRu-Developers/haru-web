'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ConnectInstagramAccountButton from '@common/components/buttons/48px/ConnectInstagramAccountButton/ConnectInstagramAccountButton.client';
import StartButton from '@common/components/buttons/48px/StartButton/StartButton';
import SkipForNowButton from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.client';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';

import {
  useInstagramConnection,
  useOnboardingWorkspaceId,
} from '@features/on-boarding/hooks/stores/useOnBoardingStore';

import { WORKSPACES_ON_BOARDING_API_ENDPOINTS } from '@/api/on-boarding/api-end-point.constants';

const OnBoardingInstaStep = () => {
  const router = useRouter();

  const isConnected = useInstagramConnection();
  const workspaceId = useOnboardingWorkspaceId();

  const handleConnectInstagram = () => {
    // 1. .env.local 파일에서 클라이언트 ID 가져오기
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;

    // 2. 리디렉션 URI
    const redirectUri = `${window.location.origin}/onboarding/instagram-callback`;

    // 3. 인스타그램에 요청할 권한 범위 설정
    const scope =
      'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights';

    // 4. 최종 인증 URL 생성
    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&force_reauth=true`;

    // 5. 생성된 URL로 사용자를 이동시킴
    window.location.href = authUrl;
  };

  const handleStart = () => {
    if (workspaceId) {
      router.push(WORKSPACES_ON_BOARDING_API_ENDPOINTS.WORKSPACE_DETAIL(workspaceId));
    } else {
      // 이 경우는 거의 없지만, 만약을 위한 방어 코드
      console.error('워크스페이스 정보가 없어 시작할 수 없습니다. 온보딩을 다시 진행해주세요.');
      router.push(ROUTES.ONBOARDING);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-t2-bd mb-6pxr whitespace-pre-line">
        {`SNS 이벤트 어시스턴트 기능 이용을 위해\n인스타그램 계정을 연동해 주세요.`}
      </p>
      <p className="text-b2-rg text-gray-200">
        인스타그램 연동으로 이벤트를 간편하게 운영해 보세요.
      </p>
      <div className="mt-44pxr mb-169pxr">
        {/* isConnected 상태에 따라 버튼 UI가 자동으로 바뀜 */}
        <ConnectInstagramAccountButton isConnected={isConnected} onClick={handleConnectInstagram} />
      </div>
      <div className="gap-8pxr flex">
        <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_48} onClick={handleStart} />

        {/* isConnected가 true일 때만 시작하기 버튼이 활성화됨 */}
        <StartButton onClick={handleStart} disabled={!isConnected} />
      </div>
    </div>
  );
};

export default OnBoardingInstaStep;
