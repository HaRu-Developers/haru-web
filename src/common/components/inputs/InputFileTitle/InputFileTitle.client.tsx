'use client';

import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { InputFileTitleMode, InputFileTitleProps } from './InputFileTitle.types';

/*
 * 인풋 파일 타이틀 컴포넌트
 */
const InputFileTitle = ({
  mode = InputFileTitleMode.DEFAULT,
  value,
  onSave,
  onCancel,
  onRequestEdit,
  noPadding = false,
  isLoading = false,
  editingScopeRef,
  onMode,
}: InputFileTitleProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const lastActionRef = useRef<'none' | 'enter' | 'escape'>('none');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (mode !== InputFileTitleMode.EDITABLE) return;

    if (e.key === 'Enter') {
      onSave?.(inputValue);
      onMode?.(InputFileTitleMode.DEFAULT);
      (e.currentTarget as HTMLInputElement).blur(); // 이어지는 blur는 가드로 무시
    } else if (e.key === 'Escape') {
      lastActionRef.current = 'escape';
      setInputValue(value);
      onCancel?.();
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  const handleBlur = () => {
    onSave?.(inputValue);
    onMode?.(InputFileTitleMode.DEFAULT);
  };

  // 읽기모드에서 클릭시 편집 요청
  const handleClickReadOnly = () => {
    if (mode !== InputFileTitleMode.EDITABLE) {
      onRequestEdit?.();
    }
  };

  // 가로 padding
  const px = noPadding ? 'px-0' : 'px-2';

  return isLoading ? (
    <div className="w-676pxr h-36pxr animate-bg-pulse rounded-6pxr" />
  ) : (
    <input
      aria-label="파일 제목"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onClick={handleClickReadOnly}
      className={clsx(
        'w-676pxr h-36pxr rounded-4pxr text-t1-sb flex items-center bg-white py-0.5 text-black outline-none focus:outline-none',
        px,
        { 'border-stroke-100 border': mode === InputFileTitleMode.EDITABLE },
      )}
      readOnly={mode !== InputFileTitleMode.EDITABLE}
      autoFocus={mode === InputFileTitleMode.EDITABLE}
    />
  );
};

export default InputFileTitle;
