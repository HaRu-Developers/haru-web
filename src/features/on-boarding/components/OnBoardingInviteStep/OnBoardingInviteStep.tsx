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
  useOnboardingState,
} from '@features/on-boarding/hooks/stores/useOnBoardingStore';
import { useOnboardingToastActions } from '@features/on-boarding/hooks/stores/useOnboardingToastStore';

import { useInviteMembersMutation } from '@/api/on-boarding/post/mutations/useInviteMemberMutation';

const OnBoardingInviteStep = () => {
  const { setEmails, nextStep } = useOnboardingActions();
  const { workspaceId, emails } = useOnboardingState();
  const [value, setValue] = useState('');
  const [isInvited, setIsInvited] = useState(false); // 초대 완료 여부 state

  const { mutate: inviteMembers, isPending: isInviting } = useInviteMembersMutation();

  // 토스트 띄우기 유틸
  const { showOnboardingToast } = useOnboardingToastActions();

  const handleSkip = () => {
    nextStep();
  };

  const handleNext = () => {
    if (emails.length === 0) return;
    nextStep();
  };

  const handleInvite = (emailsToInvite: string[]) => {
    if (!workspaceId) {
      return;
    }

    inviteMembers(
      { workspaceId, emails: emailsToInvite },
      {
        onSuccess: () => {
          showOnboardingToast({ type: OnboardingToastType.SUCCESS_INVITE });
          setIsInvited(true);
        },
        onError: (error) => {
          console.error('멤버 초대 실패:', error);
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <p className="text-t2-bd mb-6pxr whitespace-pre-line">
        {`워크스페이스에 초대할 팀원의 \n 이메일 주소를 입력해주세요.`}
      </p>
      <p className="text-b2-rg mb-44pxr text-gray-200">
        함께할 팀원들의 이메일을 입력해 초대해 보세요.
      </p>

      <div className="mb-217pxr relative">
        <InputInviteMember
          className="w-414pxr absolute"
          value={value}
          onValueChange={setValue}
          onInvite={handleInvite}
          isInviting={isInviting}
          emails={emails}
          onEmailsChange={setEmails}
        />
      </div>

      <div className="gap-8pxr flex">
        {isInvited ? (
          <MoveToNextButton onClick={handleNext} width={MoveToNextButtonWidth.WIDTH_414} />
        ) : (
          <>
            <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_48} onClick={handleSkip} />
            <MoveToNextButton
              onClick={handleNext}
              width={MoveToNextButtonWidth.WIDTH_260}
              disabled={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OnBoardingInviteStep;
