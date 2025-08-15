'use client';

import React, { useState } from 'react';

import clsx from 'clsx';

import EyeIcons from '@icons/EyeIcons/EyeIcons';
import { EyeIconsState } from '@icons/EyeIcons/EyeIcons.types';

import {
  InputOnboardingProps,
  OnboardingMode,
  OnboardingState,
  OnboardingType,
} from './InputOnboarding.types';

/*
  인풋 온보딩 컴포넌트
 */
const InputOnboarding = ({
  mode = OnboardingMode.DEFAULT,
  title,
  inputValue,
  placeholder,
  onChange,
  type = OnboardingType.SHOW,
  message,
  state = OnboardingState.DEFAULT,
}: InputOnboardingProps) => {
  const [isShowing, setIsShowing] = useState<boolean>(type === OnboardingType.SHOW);

  const handleShow = () => {
    setIsShowing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="text-b3-rg inline-flex flex-col items-start gap-1.5">
      <span>{title}</span>
      {/* 인풋 박스 */}
      {/* type이 HIDE인 경우 비밀번호 입력창 */}
      {/* type이 SHOW인 경우 일반 입력창 */}
      <div className="relative">
        <input
          type={isShowing ? 'text' : 'password'}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            'w-414pxr rounded-9pxr flex h-12 items-center gap-2.5 px-2.5 py-4.5 outline-none',
            {
              'border-stroke-100':
                mode === OnboardingMode.DEFAULT && state === OnboardingState.DEFAULT,
              border: mode === OnboardingMode.DEFAULT,
              'border-stroke-selected border-2': mode === OnboardingMode.EDITABLE,
              'border-system-red': state === OnboardingState.ERROR,
              'border-secondary-green': state === OnboardingState.APPROVAL,
            },
          )}
        />
        {type === OnboardingType.HIDE && (
          <div className="absolute top-4 right-5 h-5 w-5 cursor-pointer" onClick={handleShow}>
            <EyeIcons
              state={isShowing === false ? EyeIconsState.CLOSED : EyeIconsState.OPENED}
              className="pointer-events-none"
            />
          </div>
        )}
      </div>
      {/* 메시지 */}
      {/* state가 ERROR인 경우 빨간색, APPROVAL인 경우 초록색 */}
      {/* 그 외의 경우는 기본 텍스트 색상 */}
      <span
        className={clsx('text-cap1-rg', {
          'text-system-red': state === OnboardingState.ERROR,
          'text-secondary-green': state === OnboardingState.APPROVAL,
        })}
      >
        {message}
      </span>
    </div>
  );
};

export default InputOnboarding;
