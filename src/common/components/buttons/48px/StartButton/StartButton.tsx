'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '시작하기' 버튼
 */

const StartButton = ({ disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-48pxr w-260pxr rounded-9pxr py-17pxr inline-flex items-center justify-center whitespace-nowrap text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
      )}
      onClick={onClick}
      {...props}
    >
      시작하기
    </button>
  );
};

export default StartButton;
