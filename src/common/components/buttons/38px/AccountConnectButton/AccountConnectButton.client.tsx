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
        'text-bt1-sb inline-flex h-[38px] w-[128px] items-center justify-center rounded-[7px] border bg-gray-100 px-[16px] py-[12px] text-white',
      )}
      onClick={onClick}
      {...props}
    >
      계정 연동하기
    </button>
  );
};

export default AccountConnectButton;
