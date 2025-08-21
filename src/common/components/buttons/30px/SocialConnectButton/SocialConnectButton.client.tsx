'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * 'SNS 계정 연동' 버튼
 */
const SocialConnectButton = ({ onClick, disabled, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb border-stroke-200 h-30pxr w-105pxr rounded-6pxr px-12pxr py-5pxr inline-flex items-center justify-center border whitespace-nowrap text-gray-100',
        disabled ? 'bg-gray-600' : 'bg-white',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      SNS 계정 연동
    </button>
  );
};

export default SocialConnectButton;
