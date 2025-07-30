'use client';

import clsx from 'clsx';

import { ChangePasswordButtonProps, ChangePasswordButtonState } from './ChangePasswordButton.types';

/**
 * '비밀번호 변경' 버튼
 */
const ChangePasswordButton = ({
  state,
  onClick,
  disabled,
  ...props
}: ChangePasswordButtonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb border-stroke-200 h-30pxr w-99pxr rounded-6pxr px-12pxr py-5pxr inline-flex items-center justify-center border whitespace-nowrap',
        {
          // COLOR_PRIMARY 상태일 때
          'text-white': state === ChangePasswordButtonState.COLOR_PRIMARY,
          'bg-primary': state === ChangePasswordButtonState.COLOR_PRIMARY && !disabled,
          'bg-primary-inactive': state === ChangePasswordButtonState.COLOR_PRIMARY && disabled,
          // COLOR_WHITE 상태일 때
          'text-gray-100': state === ChangePasswordButtonState.COLOR_WHITE,
          'bg-white': state === ChangePasswordButtonState.COLOR_WHITE && !disabled,
          'bg-gray-600': state === ChangePasswordButtonState.COLOR_WHITE && disabled,
        },
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
