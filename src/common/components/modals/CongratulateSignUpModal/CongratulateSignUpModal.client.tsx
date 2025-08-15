'use client';

import { useRouter } from 'next/navigation';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import CreateWorkspaceButton from '@common/components/buttons/48px/CreateWorkspaceButton/CreateWorkspaceButton.client';
import { CreateWorkspaceButtonState } from '@common/components/buttons/48px/CreateWorkspaceButton/CreateWorkspaceButton.types';
import NavigateToMainButton from '@common/components/buttons/48px/NavigateToMainButton/NavigateToMainButton.client';
import { NavigateToMainButtonState } from '@common/components/buttons/48px/NavigateToMainButton/NavigateToMainButton.types';

import { CongratulateSignUpModalProps } from './CongratulateSignUpModal.types';

const CongratulateSignUpModal = ({
  onWorkspaceCreate,
  isInvited,
}: CongratulateSignUpModalProps) => {
  return (
    <div className="w-604pxr py-36pxr h-459pxr rounded-16pxr shadow-modal flex flex-col items-center justify-center bg-white">
      <IndividualIcons state={IndividualIconsState.CONGRATULATE_SIGN_UP} />
      <div className="gap-y-8pxr mt-28pxr w-317pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">HaRu에 오신 걸 환영합니다!</p>
        <div className="text-b3-rg w-355pxr text-center text-gray-300">
          <p>이제부터는 회의 진행부터 이벤트 추첨, 팀 분위기 파악까지</p>
          <p>하루의 모든 협업을 HaRu가 함께 도와드릴게요.</p>
        </div>
      </div>
      {/*초대된 가입 여부에 따라 이동하는 영역이 달라집니다.*/}
      {isInvited ? (
        <div className="mt-48pxr flex flex-row">
          <NavigateToMainButton
            disabled={false}
            state={NavigateToMainButtonState.WIDTH_260_BLACK}
          />
        </div>
      ) : (
        <div className="mt-48pxr gap-x-10pxr flex flex-row">
          <CreateWorkspaceButton
            onClick={onWorkspaceCreate}
            state={CreateWorkspaceButtonState.WIDTH_214PXR}
          />
          <NavigateToMainButton
            state={NavigateToMainButtonState.WIDTH_214_WHITE}
            disabled={false}
          />
        </div>
      )}
    </div>
  );
};

export default CongratulateSignUpModal;
