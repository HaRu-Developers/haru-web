'use client';

import clsx from 'clsx';

import ThirdPartyLogoIcons from '@icons/logos/ThirdPartyLogoIcon/ThirdPartyLogoIcons';
import { ThirdPartyLogoIconsState } from '@icons/logos/ThirdPartyLogoIcon/ThirdPartyLogoIcons.types';

import { GoogleLoginButtonProps } from './GoogleLoginButton.types';

/**
 * 'Google로 로그인하기' 버튼
 */
const GoogleLoginButton = ({
  className,
  onClick,
  buttonText,
  ...props
}: GoogleLoginButtonProps) => {
  return (
    <button
      className={clsx(
        'text-b3-rg border-stroke-100 h-48pxr w-414pxr gap-x-4pxr rounded-9pxr inline-flex items-center justify-center border bg-white text-gray-100',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <ThirdPartyLogoIcons state={ThirdPartyLogoIconsState.GOOGLE_DEFAULT} />
      <p>{buttonText}</p>
    </button>
  );
};

export default GoogleLoginButton;
