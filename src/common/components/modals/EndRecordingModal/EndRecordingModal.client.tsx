'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import ConfirmEndingRecordButton from '@common/components/buttons/38px/ConfirmEndingRecordButton/ConfirmEndingRecordButton.client';

import { EndRecordingModalProps } from './EndRecordingModal.types';

const EndRecordingModal = ({ onClose, onAbort, onProceed }: EndRecordingModalProps) => {
  return (
    <div className="w-368pxr h-214pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center bg-white">
      <button onClick={onClose} className="top-22pxr right-20pxr absolute">
        <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
      </button>
      <div className="gap-y-6pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">회의 내용 녹음을 종료하시겠어요?</p>
      </div>
      <div className="gap-y-6pxr mt-28pxr flex flex-col items-center justify-center">
        <ConfirmEndingRecordButton onClick={onProceed} isEndingRecord />
        <ConfirmEndingRecordButton onClick={onAbort} isEndingRecord={false} />
      </div>
    </div>
  );
};

export default EndRecordingModal;
