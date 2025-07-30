'use client';

import clsx from 'clsx';

import { NavigateToMainButtonProps, NavigateToMainButtonState } from './NavigateToMainButton.types';

/**
 * '메인 홈으로 이동' 버튼
 */
const NavigateToMainButton = ({ disabled, className, state }: NavigateToMainButtonProps) => {
  switch (state) {
    case NavigateToMainButtonState.WIDTH_260_BLACK:
      return (
        <button
          className={clsx(
            'text-bt1-sb h-48pxr w-260pxr rounded-9pxr inline-flex items-center justify-center text-white',
            disabled ? 'bg-gray-100' : 'bg-gray-500',
            className,
          )}
        >
          메인 홈으로 이동
        </button>
      );
    case NavigateToMainButtonState.WIDTH_214_WHITE:
      return (
        <button
          className={clsx(
            'text-bt1-sb h-48pxr w-214pxr rounded-9pxr border-stroke-100 inline-flex items-center justify-center border text-gray-100',
            disabled ? '' : 'bg-white',
            className,
          )}
        >
          메인 홈으로 이동
        </button>
      );
  }
};

export default NavigateToMainButton;
