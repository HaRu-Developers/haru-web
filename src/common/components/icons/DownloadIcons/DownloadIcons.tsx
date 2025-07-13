import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import DownloadIcon from '@svgs/download/DownloadIcon.svg';
import DownloadFileIcon from '@svgs/download/FileDownloadIcon.svg';

import { DownloadIconsState } from './DownloadIcons.types';

const DownloadIcons = ({ state, className }: IconsCommonProps<DownloadIconsState>) => {
  switch (state) {
    case DownloadIconsState.DOWNLOAD_BLACK:
      return <DownloadIcon className={clsx('h-[18px] w-[18px] text-black', className)} />;
    case DownloadIconsState.DOWNLOAD_WHITE:
      return <DownloadIcon className={clsx('h-[18px] w-[18px] text-white', className)} />;
    case DownloadIconsState.FILE_DOWNLOAD_PDF:
      return (
        <DownloadFileIcon
          className={clsx('h-[20px] w-[20px] rounded-full text-[#F83E33]', className)}
        />
      );
    case DownloadIconsState.FILE_DOWNLOAD_WORD:
      return (
        <DownloadFileIcon
          className={clsx('h-[20px] w-[20px] rounded-full text-[#CD53F3]', className)}
        />
      );
    default:
      return null;
  }
};

export default DownloadIcons;
