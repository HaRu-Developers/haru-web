'use client';

import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';

import { CreateMeetingMinutesModalProps } from './CreateMeetingMinutesModal.types';
import FileDropzone from './FileDropZone/FileDropZone';

/**
 * 새로운 회의록을 생성할 때 사용하는 모달입니다.
 * File을 모달 내에서 처리하고 있습니다. 다음 단계로 넘어가는
 * @param param0 - onClose: 모달을 닫는 함수
 * @param param0 - onNextStep: 다음 단계로 넘어가는 함수
 * @returns
 */
const CreateMeetingMinutesModal = ({ onClose, onNextStep }: CreateMeetingMinutesModalProps) => {
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    console.log('선택된 파일:', file);
  };

  return (
    <div className="gap-y-16pxr p-24pxr rounded-16pxr w-582pxr h-408pxr shadow-modal flex flex-col items-center justify-center">
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <p className="text-t3-bd text-black">새로운 회의록</p>

        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>
      <InputFieldModal
        title="회의명"
        placeholder="회의의 제목을 입력해 주세요."
        value={meetingTitle}
        onChange={setMeetingTitle}
      />
      <div className="w-534pxr gap-y-8pxr items-center justify-center">
        <p className="text-cap1-rg text-gray-200">회의 안건지 업로드</p>
        <FileDropzone onFileChange={handleFileChange} initialFile={selectedFile} />
      </div>
      <div className="w-534pxr flex items-center justify-end">
        <NextStepButton onClick={onNextStep} disabled={!meetingTitle} />
      </div>
    </div>
  );
};

export default CreateMeetingMinutesModal;
