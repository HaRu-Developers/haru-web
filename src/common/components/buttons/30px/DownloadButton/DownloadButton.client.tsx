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
        'text-bt3-sb inline-flex h-[30px] w-[96px] items-center justify-center space-x-[4px] rounded-[100px] bg-gray-100 py-[6px] pr-[14px] pl-[12px] text-white',
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
