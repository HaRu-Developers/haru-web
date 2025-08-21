import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';
import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { acceptedTypes, maxSize } from './FileDropZone.constants';
import { FileDropzoneProps } from './FileDropzone.types';

const FileDropzone = ({
  onFileChange,
  initialFile = null,
  disabled = false,
}: FileDropzoneProps) => {
  const [file, setFile] = useState<File | null>(initialFile);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 변경 시 부모에게 알림
  const updateFile = (newFile: File | null) => {
    setFile(newFile);
    onFileChange?.(newFile);
  };

  // 사이즈, 타입 검사해 에러 메시지 설정
  const setTypeOrSizeError = (f: File) => {
    if (!acceptedTypes.includes(f.type)) {
      setErrorMessage('PDF 파일만 업로드할 수 있습니다.');
      return true;
    }
    if (f.size > maxSize) {
      setErrorMessage('파일이 너무 큽니다. 최대 10MB까지 업로드할 수 있습니다.');
      return true;
    }
    setErrorMessage('');
    return false;
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

    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;

    if (setTypeOrSizeError(dropped)) return;
    updateFile(dropped);
    setHasUploaded(true);
  };

  // 클릭시 input file 열기
  const handleAreaClick = () => inputRef.current?.click();

  // 파일 선택 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0];
    if (!chosen) return;

    if (setTypeOrSizeError(chosen)) {
      // 선택창에서 잘못 고른 경우 인풋 초기화
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    updateFile(chosen);
    setHasUploaded(true);
  };

  // 파일 삭제
  const handleRemove = () => {
    updateFile(null);
    if (inputRef.current) inputRef.current.value = '';
    setHasUploaded(false);
    setErrorMessage('');
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
        !!errorMessage && 'border-system-red border-2',
        dragActive && 'border-2 border-blue-500 bg-blue-50',
        disabled ? 'disabled-style' : 'cursor-pointer',
      )}
    >
      {/* 숨겨진 파일 인풋 */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept={acceptedTypes.join(',')}
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
      {errorMessage && <p className="text-b3-rg text-system-red mt-8pxr">{errorMessage}</p>}
    </div>
  );
};

export default FileDropzone;
