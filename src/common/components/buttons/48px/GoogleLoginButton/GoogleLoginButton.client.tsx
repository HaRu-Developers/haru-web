'use client';

import ThirdPartyLogoIcons from '@icons/logos/GoogleLogoIcon/ThirdPartyLogoIcons';
import { ThirdPartyLogoIconsState } from '@icons/logos/GoogleLogoIcon/ThirdPartyLogoIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * 'Google로 로그인하기' 버튼
 */
const GoogleLoginButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className="text-b3-rg border-stroke-100 inline-flex h-[48px] w-[414px] items-center justify-center gap-x-[4px] rounded-[9px] border bg-white py-[16.5px] text-gray-100"
      onClick={onClick}
      {...props}
    >
      <ThirdPartyLogoIcons state={ThirdPartyLogoIconsState.GOOGLE_DEFAULT} />
      <p>Google로 로그인하기</p>
    </button>
  );
};

export default GoogleLoginButton;
