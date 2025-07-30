'use client';

import { useState } from 'react';

import MoveToNextButton from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.client';
import { MoveToNextButtonWidth } from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.types';
import SkipForNowButton from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.client';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';
import InputInviteMember from '@common/components/inputs/input-invite-member/InputInviteMember/InputInviteMember.client';

import { OnboardingToastType } from '@features/on-boarding/types/OnboardingToast.types';

import {
  useOnboardingActions,
  useOnboardingEmails,
} from '@features/on-boarding/hooks/stores/useOnBoardingStore';
import { useOnboardingToastActions } from '@features/on-boarding/hooks/stores/useOnboardingToastStore';

const OnBoardingInviteStep = () => {
  const { setEmails, nextStep } = useOnboardingActions();
  const emails = useOnboardingEmails();
  const [value, setValue] = useState('');

  // 토스트 띄우기 유틸
  const { showOnboardingToast } = useOnboardingToastActions();

  const handleSkip = () => {
    nextStep();
  };

  const handleNext = () => {
    if (emails.length === 0) return;
    nextStep();
  };

  const handleInvite = (emails: string[]) => {
    // 초대 버튼 클릭 시 호출 됩니다. -> 이메일 목록 반환
    // 이메일 목록은 여기서 반환되고 기존 이메일 목록은 제거됩니다.
    console.log('초대할 이메일 목록:', emails);
    // 온보딩 토스트 띄우귀
    showOnboardingToast({
      type: OnboardingToastType.SUCCESS_INVITE,
    });
  };

  const isNextButtonDisabled = emails.length === 0;

  return (
    <div className="flex flex-col">
      <p className="text-t2-bd mb-6pxr whitespace-pre-line">
        {`워크스페이스에 초대할 팀원의 \n 이메일 주소를 입력해주세요.`}
      </p>
      <p className="text-b2-rg mb-36pxr text-gray-200">
        함께할 팀원들의 이메일을 입력해 초대해 보세요.
      </p>

      <div className="mb-228pxr relative">
        <InputInviteMember
          className="absolute"
          title=""
          value={value}
          onValueChange={setValue}
          onInvite={handleInvite}
          emails={emails}
          onEmailsChange={setEmails}
        />
      </div>

      <div className="gap-8pxr flex">
        <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_48} onClick={handleSkip} />

        <MoveToNextButton
          onClick={handleNext}
          width={MoveToNextButtonWidth.WIDTH_260}
          disabled={isNextButtonDisabled}
        />
      </div>
    </div>
  );
};

export default OnBoardingInviteStep;
