'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';

interface CreateNewEventModalProps {
  onClose: () => void;
  onNextStep: () => void;
  title: string;
}

/**
 * 새로운 이벤트를 생성할 때 사용하는 모달입니다.
 */
const CreateNewEventModal = ({ onClose, onNextStep }: CreateNewEventModalProps) => {
  return (
    <div className="space-y-16pxr m-24pxr rounded-16pxr w-582pxr h-408pxr shadow-modal flex flex-col items-center justify-center">
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <p className="text-t3-bd text-black">새로운 이벤트</p>

        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>

      <div className="w-534pxr flex items-center justify-end">
        <NextStepButton onClick={onNextStep} disabled={true} />
      </div>
    </div>
  );
};

export default CreateNewEventModal;
