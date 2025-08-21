'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '계정 연동하기' 버튼
 */
const AccountConnectButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center border bg-gray-100 text-white',
      )}
      onClick={onClick}
      {...props}
    >
      계정 연동하기
    </button>
  );
};

export default AccountConnectButton;
