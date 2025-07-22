'use client';

import React from 'react';

import clsx from 'clsx';

import { Visibility } from '../types/input-survey.common.types';
import { InputTitleSurveyProps } from './InputTitleSurvey.types';

const InputTitleSurvey = ({
  title,
  placeholder = '문항의 제목을 입력하세요.',
  visibility = Visibility.PUBLIC,
  onChange,
  className,
}: InputTitleSurveyProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={clsx('min-w-517pxr gap-6pxr flex shrink-0 flex-col items-start', className)}>
      <input
        className={clsx('w-full self-stretch text-black placeholder-gray-400 outline-none', {
          'text-b1-rg': !title,
          'text-t5-sb': title,
          'cursor-default': visibility === Visibility.PUBLIC,
        })}
        value={title}
        onChange={handleOnChange}
        placeholder={placeholder}
        readOnly={visibility === Visibility.PUBLIC}
      />
      <div className="border-stroke-200 w-full border-t" />
    </div>
  );
};

export default InputTitleSurvey;
