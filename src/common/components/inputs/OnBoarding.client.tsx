import React, { useState } from 'react';

import clsx from 'clsx';

import EyeIcons from '@icons/EyeIcons/EyeIcons';
import { EyeIconsState } from '@icons/EyeIcons/EyeIcons.types';

import {
  OnBoardingProps,
  OnboardingMode,
  OnboardingState,
  OnboardingType,
} from './OnBoarding.types';

/*
  인풋 온보딩 컴포넌트
 */

const OnBoarding = ({
  mode = OnboardingMode.DEFAULT,
  title,
  inputValue,
  placeholder,
  onChange,
  type = OnboardingType.SHOW,
  message,
  state = OnboardingState.DEFAULT,
}: OnBoardingProps) => {
  const [isShowing, setIsShowing] = useState<boolean>(type === OnboardingType.SHOW);
  const handleShow = () => {
    setIsShowing((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={clsx('text-b3-rg inline-flex flex-col items-start gap-[6px]')}>
      <span>{title}</span>
      <div className={clsx('relative')}>
        <input
          type={isShowing ? 'text' : 'password'}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            'flex h-[48px] w-[414px] items-center gap-[10px] rounded-[9px] px-[14px] py-[18px] outline-none',
            {
              'border-stroke-100':
                mode === OnboardingMode.DEFAULT && state === OnboardingState.DEFAULT,
              border: mode === OnboardingMode.DEFAULT,
              'border-audio-bar/70 border-[2px]': mode === OnboardingMode.EDITABLE,
              'border-system-red': state === OnboardingState.ERROR,
              'border-secondary-green': state === OnboardingState.APPROVAL,
            },
          )}
        />
        {type === OnboardingType.HIDE && (
          <div
            className={clsx('absolute top-[16px] right-[20px] h-[20px] w-[20px] cursor-pointer')}
            onClick={handleShow}
          >
            <EyeIcons
              state={isShowing === false ? EyeIconsState.CLOSED : EyeIconsState.OPENED}
              className={clsx('pointer-events-none')}
            />
          </div>
        )}
      </div>
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

export default OnBoarding;
