'use client';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import AccountConnectButton from '@common/components/buttons/38px/AccountConnectButton/AccountConnectButton.client';
import DeleteButton from '@common/components/buttons/38px/DeleteButton/DeleteButton.client';
import MoveButton from '@common/components/buttons/38px/MoveButton/MoveButton.client';
import CancelButton from '@common/components/buttons/diverse-size/CancelButton/CancelButton.client';
import { CancelButtonType } from '@common/components/buttons/diverse-size/CancelButton/CancelButton.types';
import SkipForNowButton from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.client';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';

import { DeleteModalProps, DeleteModalType } from './DeleteModal.types';

const DeleteModal = ({
  modalType,
  onAbort,
  onProceed,
  cancelBtnDisabled,
  deleteBtnDisabled,
  loading,
  loadingText,
}: DeleteModalProps) => {
  const modalConfig = {
    [DeleteModalType.DELETE_REPORT]: {
      main: '정말 이 리포트를 삭제하시겠습니까?',
      sub: '삭제된 리포트는 시스템에서 완전히 제거되며, 이후 복원할 수 없습니다. 삭제 전 내용을 꼭 확인해 주세요.',
      abortButton: <CancelButton onClick={onAbort} buttonType={CancelButtonType.SIZE_38} />,
      proceedButton: <DeleteButton onClick={onProceed} />,
    },
    [DeleteModalType.DELETE_MEETING_MINUTES]: {
      main: '정말 이 회의록을 삭제하시겠습니까?',
      sub: '삭제된 회의록은 시스템에서 완전히 제거되며, 이후 복원할 수 없습니다. 삭제 전 내용을 꼭 확인해 주세요.',
      abortButton: (
        <CancelButton
          onClick={onAbort}
          buttonType={CancelButtonType.SIZE_38}
          disabled={cancelBtnDisabled}
        />
      ),
      proceedButton: (
        <DeleteButton
          onClick={onProceed}
          disabled={deleteBtnDisabled}
          loading={loading}
          loadingText={loadingText}
        />
      ),
    },
    [DeleteModalType.DELETE_EVENT]: {
      main: '정말 이 이벤트를 삭제하시겠습니까?',
      sub: '삭제된 이벤트는 시스템에서 완전히 제거되며, 이후 복원할 수 없습니다. 삭제 전 내용을 꼭 확인해 주세요.',
      abortButton: <CancelButton onClick={onAbort} buttonType={CancelButtonType.SIZE_38} />,
      proceedButton: <DeleteButton onClick={onProceed} />,
    },
    [DeleteModalType.LEAVE_MEETING_RECORD]: {
      main: '회의가 아직 진행 중이에요.',
      sub: '이 페이지를 벗어나면 회의 기록이 저장되지 않을 수 있어요. 그래도 이동하시겠어요?',
      abortButton: <CancelButton onClick={onAbort} buttonType={CancelButtonType.SIZE_38} />,
      proceedButton: <MoveButton onClick={onProceed} />,
    },
    [DeleteModalType.CONNECT_INSTAGRAM_ACCOUNT]: {
      main: '현재 연동된 SNS 계정이 없어요!',
      sub: 'SNS 이벤트 어시스턴트 기능을 이용하기 위해선, 먼저 Instagram 계정을 연동해 주세요.',
      abortButton: <SkipForNowButton onClick={onAbort} buttonType={SkipForNowButtonType.SIZE_38} />,
      proceedButton: <AccountConnectButton onClick={onProceed} />,
    },
  };

  const currentConfig = modalConfig[modalType];

  return (
    <div className="w-398pxr h-250pxr rounded-12pxr shadow-modal flex flex-col items-center justify-center bg-white">
      <IndividualIcons state={IndividualIconsState.WARNING} />
      <div className="gap-y-6pxr mt-13pxr w-317pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">{currentConfig.main}</p>
        <p className="text-b3-rg text-gray-300">{currentConfig.sub}</p>
      </div>
      <div className="gap-x-10pxr mt-28pxr flex flex-row">
        {currentConfig.abortButton}
        {currentConfig.proceedButton}
      </div>
    </div>
  );
};

export default DeleteModal;
