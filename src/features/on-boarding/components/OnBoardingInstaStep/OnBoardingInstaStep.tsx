'use client';

import { useRouter } from 'next/navigation';

import ConnectInstagramAccountButton from '@common/components/buttons/48px/ConnectInstagramAccountButton/ConnectInstagramAccountButton.client';
import StartButton from '@common/components/buttons/48px/StartButton/StartButton';
import SkipForNowButton from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.client';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';

import { OnboardingToastType } from '@features/on-boarding/types/OnboardingToast.types';

import {
  useInstagramConnection,
  useOnboardingActions,
  useOnboardingState,
} from '@features/on-boarding/hooks/stores/useOnBoardingStore';
import { useOnboardingToastActions } from '@features/on-boarding/hooks/stores/useOnboardingToastStore';

const OnBoardingInstaStep = () => {
  const router = useRouter();

  // 토스트 띄우기 유틸
  const { showOnboardingToast } = useOnboardingToastActions();

  const isConnected = useInstagramConnection();
  const { setInstagramConnected } = useOnboardingActions();

  const { name, emails, image } = useOnboardingState();

  const workspaceId = 1; // 임시

  const handleConnectInstagram = () => {
    // 실제 연동 로직 연결 - 추후
    setInstagramConnected(true); // 예시로 바로 true
    // 온보딩 토스트 띄우기
    showOnboardingToast({
      type: OnboardingToastType.SUCCESS_SNS_ACCOUNT,
      snsAccount: 'k_nijy',
    });
  };

  const handleCreateWorkSpace = () => {
    console.log('워크스페이스 생성');

    console.log('🔥 상태값 확인용');
    console.log('name:', name);
    console.log('emails:', emails);
    console.log('image:', image);
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
        <ConnectInstagramAccountButton isConnected={isConnected} onClick={handleConnectInstagram} />
      </div>
      <div className="gap-8pxr flex">
        <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_48} />

        <StartButton onClick={handleCreateWorkSpace} disabled={!isConnected} />
      </div>
    </div>
  );
};

export default OnBoardingInstaStep;
