'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '비밀번호 변경' 버튼
 */
const ChangePasswordButton = ({ onClick, disabled, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb border-stroke-200 inline-flex h-[30px] w-[99px] items-center justify-center rounded-[6px] border px-[12px] py-[5px] whitespace-nowrap text-gray-100',
        disabled ? 'bg-gray-600' : 'bg-white',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      비밀번호 변경
    </button>
  );
};

export default ChangePasswordButton;
