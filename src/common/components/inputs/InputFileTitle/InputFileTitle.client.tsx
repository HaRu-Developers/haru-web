'use client';

import { useEffect, useState } from 'react';

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
}: InputFileTitleProps) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave?.(inputValue);
    } else if (e.key === 'Escape') {
      setInputValue(value);
      onCancel?.();
    }
  };

  const handleBlur = () => {
    onSave?.(inputValue);
  };
  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={clsx(
        'w-676pxr h-36pxr rounded-4pxr text-t1-sb flex items-center bg-white py-0.5 text-black outline-none focus:outline-none',
        {
          'border-stroke-100 border': mode === InputFileTitleMode.EDITABLE,
        },
      )}
      readOnly={mode !== InputFileTitleMode.EDITABLE}
      autoFocus
    />
  );
};

export default InputFileTitle;
