'use client';

import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import useCreateNewMeetingMinutes from '@api/meeting/post/mutations/useCreateNewMeetingMinutes';

import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';

import { CreateMeetingMinutesModalProps } from './CreateMeetingMinutesModal.types';
import FileDropzone from './FileDropZone/FileDropZone';

/**
 * 새로운 회의록을 생성할 때 사용하는 모달입니다.
 * File을 모달 내에서 처리하고 있습니다. 다음 단계로 넘어가는
 *
 * @param {() => void} onClose - 모달을 닫는 콜백 함수
 * @param {(meetingId: string) => void} onNextStep - 다음 단계로 이동하는 콜백 함수
 * @param {string} workspaceId - 워크스페이스 ID
 */
const CreateMeetingMinutesModal = ({
  onClose,
  onNextStep,
  workspaceId,
}: CreateMeetingMinutesModalProps) => {
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // api 호출 완료 후 페이지 이동할 거여서 mutateAsync 사용
  const {
    mutateAsync: createNewMeetingMinutes,
    isError,
    error,
    isPending,
  } = useCreateNewMeetingMinutes(workspaceId);

  // 렌더 중 throw → error.tsx가 뜸
  if (isError) throw error;

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleCreate = async () => {
    if (!meetingTitle || !selectedFile) return;
    const res = await createNewMeetingMinutes({
      agendaFile: selectedFile,
      request: { workspaceId, title: meetingTitle },
    });

    const meetingId = res?.result?.meetingId ?? '';
    onNextStep(meetingId); // meetingId 전달
  };

  const disabled = !meetingTitle || !selectedFile || isPending;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-mm-title"
      data-testid="modal-create-meeting-minutes"
      className="gap-y-16pxr p-24pxr rounded-16pxr w-582pxr h-408pxr shadow-modal flex flex-col items-center justify-center bg-white"
    >
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <h1 id="create-mm-title" className="text-t3-bd text-black">
          새로운 회의록
        </h1>

        <button className="mr-2pxr" onClick={onClose} aria-label="닫기">
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
        <p className="text-cap1-rg mb-8pxr text-gray-200">회의 안건지 업로드</p>
        <FileDropzone onFileChange={handleFileChange} initialFile={selectedFile} />
      </div>
      <div className="w-534pxr flex items-center justify-end">
        <NextStepButton
          onClick={handleCreate}
          disabled={disabled}
          loading={isPending}
          loadingText="생성 중..."
        />
      </div>
    </div>
  );
};

export default CreateMeetingMinutesModal;
