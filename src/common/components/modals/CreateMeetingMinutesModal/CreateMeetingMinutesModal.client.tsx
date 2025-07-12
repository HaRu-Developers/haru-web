'use client';

import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';

import { CreateMeetingMinutesModalProps } from './CreateMeetingMinutesModal.types';
import FileDropzone from './FileDropZone/FileDropZone';

// TODO: drag & drop 구현하고싶다

const CreateMeetingMinutesModal = ({ onClose, onNextStep }: CreateMeetingMinutesModalProps) => {
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    console.log('선택된 파일:', file);
  };

  return (
    <div className="space-y-16pxr m-24pxr rounded-16pxr w-582pxr h-408pxr shadow-modal flex flex-col items-center justify-center">
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <p className="text-t3-bd text-black">새로운 회의록</p>

        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>
      <div className="w-534pxr space-y-8pxr">
        <p className="text-cap1-rg text-gray-200">회의명</p>
        <input
          type="text"
          className="h-48pxr rounded-4pxr py-6pxr px-12pxr w-full border border-gray-400"
          placeholder="회의의 제목을 입력해 주세요."
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
        />
      </div>
      <div className="w-534pxr space-y-8pxr items-center justify-center">
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
