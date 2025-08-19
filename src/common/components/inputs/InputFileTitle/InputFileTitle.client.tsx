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
  isLoading = false,
  onMode,
  onClick,
  editingScopeRef,
  noPadding = false,
  commitTick,
  cancelTick,
}: InputFileTitleProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  /**
   * 사용자가 키 눌르면 바로 onBlur가 발생
   * 그 전에 저장, 취소 의도를 기록해 onBlur에서 실제 동작을 결정하게 함
   *
   * 동기적으로 값 바꿔도 리렌더되지 않게 useRef 사용함
   */
  const lastActionRef = useRef<'none' | 'save' | 'cancel'>('none');
  /**
   * 저장, 취소 요청 확인에(현재 tick과 이전 tick을 비교) 사용
   */
  const prevCommitRef = useRef(commitTick);
  const prevCancelRef = useRef(cancelTick);

  // 서버 값 → 로컬 값 동기화 (편집 중이 아닐 때만)
  useEffect(() => {
    if (mode !== InputFileTitleMode.EDITABLE) {
      setInputValue(value);
    }
  }, [value, mode]);

  useEffect(() => {
    // commitTick 변화에만 반응
    if (mode !== InputFileTitleMode.EDITABLE) {
      prevCommitRef.current = commitTick;
      return;
    }
    if (commitTick == null || commitTick === prevCommitRef.current) return;

    prevCommitRef.current = commitTick;

    // 값 변화했으면
    const changed = inputValue !== value;
    if (changed) onSave?.(inputValue.trim());
    else onCancel?.();
    onMode?.(InputFileTitleMode.DEFAULT);
  }, [commitTick, mode, inputValue, value, onSave, onCancel, onMode]);

  useEffect(() => {
    // cancelTick 변화에만 반응
    if (mode !== InputFileTitleMode.EDITABLE) {
      prevCancelRef.current = cancelTick;
      return;
    }
    if (cancelTick == null || cancelTick === prevCancelRef.current) return;

    prevCancelRef.current = cancelTick;

    setInputValue(value); // 롤백
    onCancel?.();
    onMode?.(InputFileTitleMode.DEFAULT);
  }, [cancelTick, mode, value, onCancel, onMode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (mode !== InputFileTitleMode.EDITABLE) return;

    // IME 조합 중이면 Enter 무시
    if (e.nativeEvent?.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      lastActionRef.current = 'save';
      (e.currentTarget as HTMLInputElement).blur(); // blur에서 저장
    } else if (e.key === 'Escape') {
      e.preventDefault();
      lastActionRef.current = 'cancel';
      (e.currentTarget as HTMLInputElement).blur(); // blur에서 취소 처리
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (mode !== InputFileTitleMode.EDITABLE) return;

    // 포커스가 같은 편집 스코프 안으로 이동하면 저장/종료하지 않음
    const next = e.relatedTarget as Node | null;
    if (next && editingScopeRef?.current?.contains(next)) return;

    // 값이 바뀌었는지
    const changed = inputValue !== value;

    if (lastActionRef.current === 'save') {
      if (changed) onSave?.(inputValue);
      else onCancel?.(); // 변경 없으면 그냥 종료
      onMode?.(InputFileTitleMode.DEFAULT);
    } else if (lastActionRef.current === 'cancel') {
      setInputValue(value); // 초기값으로 롤백
      onCancel?.();
    } else {
      // 마우스로 밖을 클릭해 포커스 아웃된 자연스러운 경우
      if (changed) onSave?.(inputValue);
      else onCancel?.(); // 변경 없으면 그냥 종료
      onMode?.(InputFileTitleMode.DEFAULT);
    }
    lastActionRef.current = 'none';
  };

  // 가로 padding

  return (
    <input
      aria-label="파일 제목 입력칸"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onClick={onClick}
      className={clsx(
        'w-692pxr h-36pxr rounded-4pxr border px-2 text-t1-sb flex items-center bg-white py-0.5 text-black outline-none focus:outline-none',
        { 'border-stroke-100 px-2': mode === InputFileTitleMode.EDITABLE },
        { 'hover:bg-gray-600 border-transparent': mode === InputFileTitleMode.DEFAULT },
      )}
      readOnly={mode !== InputFileTitleMode.EDITABLE}
      autoFocus={mode === InputFileTitleMode.EDITABLE}
    />
  );
};

export default InputFileTitle;
