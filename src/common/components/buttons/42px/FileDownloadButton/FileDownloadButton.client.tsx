import DownloadIcons from '@icons/DownloadIcons/DownloadIcons';
import { DownloadIconsState } from '@icons/DownloadIcons/DownloadIcons.types';

import { FileDownloadButtonProps, FileDownloadButtonType } from './FileDownloadButton.types';

const FileDownloadButton = ({ buttonType, ...props }: FileDownloadButtonProps) => {
  return (
    <button
      className="w-348pxr h-42pxr rounded-6pxr border-stroke-200 gap-x-8pxr flex items-center justify-center border bg-white hover:bg-gray-600"
      {...props}
    >
      <DownloadIcons
        state={
          buttonType === FileDownloadButtonType.PDF
            ? DownloadIconsState.FILE_DOWNLOAD_PDF
            : DownloadIconsState.FILE_DOWNLOAD_WORD
        }
      />
      <span className="text-bt3-sb text-black">
        {buttonType === FileDownloadButtonType.PDF ? 'PDF 다운로드' : 'Word 다운로드'}
      </span>
    </button>
  );
};

export default FileDownloadButton;
