'use client';

import ThirdPartyLogoIcons from '@icons/logos/ThirdPartyLogoIcon/ThirdPartyLogoIcons';
import { ThirdPartyLogoIconsState } from '@icons/logos/ThirdPartyLogoIcon/ThirdPartyLogoIcons.types';

import { ConnectInstagramAccountButtonProps } from './ConnectInstagramAccountButton.types';

/**
 * 'Instagram 계정 연동하기' 버튼
 */

const ConnectInstagramAccountButton = ({
  isConnected,
  onClick,
  ...props
}: ConnectInstagramAccountButtonProps) => {
  return (
    <button
      className="text-b3-rg border-stroke-100 h-48pxr w-414pxr gap-x-4pxr rounded-9pxr inline-flex items-center justify-center border bg-white text-gray-100"
      onClick={onClick}
      {...props}
    >
      <ThirdPartyLogoIcons state={ThirdPartyLogoIconsState.INSTAGRAM_DEFAULT} />
      <p>{isConnected ? '다른 Instagram 계정으로 연동하기' : 'Instagram 계정 연동하기'}</p>
    </button>
  );
};

export default ConnectInstagramAccountButton;
