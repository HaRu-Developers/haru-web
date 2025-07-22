import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';
import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { FileDropzoneProps } from './FileDropzone.types';

const FileDropzone = ({ onFileChange, initialFile = null }: FileDropzoneProps) => {
  const [file, setFile] = useState<File | null>(initialFile);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 변경 시 부모에게 알림
  const updateFile = (newFile: File | null) => {
    setFile(newFile);
    onFileChange?.(newFile);
  };

  // 드래그 관련 핸들러
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  // 드롭 처리
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const acceptedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (acceptedTypes.includes(droppedFile.type)) {
        updateFile(droppedFile);
      } else {
        alert('PDF 또는 Word 문서만 업로드할 수 있습니다.');
      }
    }
  };

  // 클릭시 input file 열기
  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  // 파일 선택 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFile(e.target.files[0]);
      setHasUploaded(true);
    }
  };

  // 파일 삭제
  const handleRemove = () => {
    updateFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onClick={handleAreaClick}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={clsx(
        'w-534pxr h-166pxr rounded-12pxr gap-y-8pxr flex flex-col items-center justify-center bg-[#F8F8FA]',
        dragActive && 'border-2 border-blue-500 bg-blue-50',
      )}
    >
      {/* 숨겨진 파일 인풋 */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      <div className="h-86pxr w-86pxr border-stroke-100 rounded-48pxr gap-y-4pxr flex flex-col items-center justify-center border-[1.5px] border-dashed">
        <IndividualIcons state={IndividualIconsState.UPLOAD} />
        <p className="text-bt3-sb text-gray-200">{hasUploaded ? '재업로드' : '업로드하기'}</p>
      </div>

      {file && (
        <div className="max-w-514pxr gap-x-3pxr h-22pxr flex flex-row items-center justify-center">
          <span className="text-b3-rg max-w-470pxr overflow-hidden text-center text-ellipsis whitespace-nowrap text-black">
            {file.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
              setHasUploaded(false);
            }}
            aria-label="파일 삭제"
          >
            <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
