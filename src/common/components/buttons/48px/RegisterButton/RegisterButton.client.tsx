'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '회원가입하기' 버튼
 */
const RegisterButton = ({ disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb inline-flex h-[48px] w-[414px] items-center justify-center rounded-[9px] px-[152px] py-[17px] text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
      )}
      onClick={onClick}
      {...props}
    >
      회원가입하기
    </button>
  );
};

export default RegisterButton;
