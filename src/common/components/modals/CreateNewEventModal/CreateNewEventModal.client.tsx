'use client';

import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';

interface CreateNewEventModalProps {
  onClose: () => void;
  onNextStep: () => void;
  title: string;
}

/**
 * 새로운 이벤트를 생성할 때 사용하는 모달입니다.
 */
const CreateNewEventModal = ({ onClose, onNextStep }: CreateNewEventModalProps) => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [snsEventLink, setSnsEventLink] = useState<string>('');

  return (
    <div className="p-24pxr rounded-16pxr w-582pxr h-408pxr shadow-modal flex flex-col items-center justify-center">
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <p className="text-t3-bd text-black">새로운 이벤트</p>
        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>
      <div className="gap-y-16pxr flex flex-col">
        <InputFieldModal
          title="이벤트명"
          placeholder="이벤트의 제목을 입력해 주세요."
          value={eventTitle}
          onChange={setEventTitle}
        />
        <InputFieldModal
          title="SNS 이벤트 링크"
          placeholder="이벤트의 링크를 입력해 주세요."
          value={snsEventLink}
          onChange={setSnsEventLink}
        />
      </div>

      <div className="w-534pxr flex items-center justify-end">
        <NextStepButton onClick={onNextStep} disabled={true} />
      </div>
    </div>
  );
};

export default CreateNewEventModal;
