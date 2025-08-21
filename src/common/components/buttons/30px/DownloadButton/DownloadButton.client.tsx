'use client';

import clsx from 'clsx';

import DownloadIcons from '@icons/DownloadIcons/DownloadIcons';
import { DownloadIconsState } from '@icons/DownloadIcons/DownloadIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '다운로드' 버튼
 */
const DownloadButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt3-sb h-30pxr w-96pxr gap-x-4pxr rounded-100pxr py-6pxr pr-14pxr pl-12pxr inline-flex items-center justify-center bg-gray-100 text-white',
      )}
      onClick={onClick}
      {...props}
    >
      <DownloadIcons state={DownloadIconsState.DOWNLOAD_WHITE} />
      <p>다운로드</p>
    </button>
  );
};

export default DownloadButton;
