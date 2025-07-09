'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '로그인하기' 버튼
 */
const LoginButton = ({ disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb inline-flex h-[48px] w-[414px] items-center justify-center rounded-[9px] px-[152px] py-[17px] text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
      )}
      onClick={onClick}
      {...props}
    >
      로그인하기
    </button>
  );
};

export default LoginButton;
