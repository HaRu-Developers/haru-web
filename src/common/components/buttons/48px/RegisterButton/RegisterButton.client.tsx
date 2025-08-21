'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '회원가입하기' 버튼
 */
const RegisterButton = ({ className, disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-48pxr w-414pxr rounded-9pxr px-152pxr py-17pxr inline-flex items-center justify-center text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      회원가입하기
    </button>
  );
};

export default RegisterButton;
