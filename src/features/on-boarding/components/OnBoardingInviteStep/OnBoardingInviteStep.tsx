'use client';

import { useState } from 'react';

import MoveToNextButton from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.client';
import { MoveToNextButtonWidth } from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.types';
import SkipForNowButton from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.client';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';
import InputInviteMember from '@common/components/inputs/input-invite-member/InputInviteMember/InputInviteMember.client';

import {
  useOnboardingActions,
  useOnboardingEmails,
} from '@features/on-boarding/hooks/stores/useOnBoardingStore';

const OnBoardingInviteStep = () => {
  const { setEmails, nextStep } = useOnboardingActions();
  const emails = useOnboardingEmails();
  const [value, setValue] = useState('');

  const handleSkip = () => {
    nextStep();
  };

  const handleNext = () => {
    if (emails.length === 0) return;
    nextStep();
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
