'use client';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import CreateWorkspaceButton from '@common/components/buttons/48px/CreateWorkspaceButton/CreateWorkspaceButton.client';

import { CongratulateSignUpModalProps } from './CongratulateSignUpModal.types';

const CongratulateSignUpModal = ({ onWorkspaceCreate }: CongratulateSignUpModalProps) => {
  return (
    <div className="w-604pxr h-459pxr rounded-16pxr shadow-modal flex flex-col items-center justify-center">
      <IndividualIcons state={IndividualIconsState.CONGRATULATE_SIGN_UP} />
      <div className="gap-y-8pxr mt-28pxr w-317pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">HaRu에 오신 걸 환영합니다!</p>
        <div className="text-b3-rg w-355pxr text-center text-gray-300">
          <p>이제부터는 회의 진행부터 이벤트 추첨, 팀 분위기 파악까지</p>
          <p>하루의 모든 협업을 HaRu가 함께 도와드릴게요.</p>
        </div>
      </div>
      <div className="mt-48pxr flex flex-row">
        <CreateWorkspaceButton onClick={onWorkspaceCreate} />
      </div>
    </div>
  );
};

export default CongratulateSignUpModal;
