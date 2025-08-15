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
      (e.currentTarget as HTMLInputElement).blur(); // 이어지는 blur는 가드로 무시
    } else if (e.key === 'Escape') {
      lastActionRef.current = 'escape';
      setInputValue(value);
      onCancel?.();
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Enter/Esc 직후 발생하는 blur는 무시 (중복 방지)
    if (lastActionRef.current !== 'none') {
      lastActionRef.current = 'none';
      return;
    }

    // 포커스가 같은 편집 스코프 안으로 이동하면 저장하지 않음
    const next = e.relatedTarget as Node | null;
    if (next && editingScopeRef?.current?.contains(next)) return;

    // 편집 중일 때만 저장, 값이 변하지 않았으면 스킵
    if (mode === InputFileTitleMode.EDITABLE && inputValue !== value) {
      onSave?.(inputValue);
    }
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
