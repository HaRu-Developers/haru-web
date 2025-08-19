'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '로그인하기' 버튼
 */
const LoginButton = ({ className, disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      aria-label="일반 로그인 버튼"
      className={clsx(
        'text-bt1-sb h-48pxr w-414pxr rounded-9pxr px-152pxr py-17pxr inline-flex items-center justify-center text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      로그인하기
    </button>
  );
};

export default LoginButton;
