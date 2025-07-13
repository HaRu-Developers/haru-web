'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import FileDownloadButton from '@common/components/buttons/42px/FileDownloadButton/FileDownloadButton.client';
import { FileDownloadButtonType } from '@common/components/buttons/42px/FileDownloadButton/FileDownloadButton.types';

import { DownloadModalProps } from './DownloadModal.types';

const DownloadModal = ({ onClose, onPdfDownload, onWordDownload }: DownloadModalProps) => {
  return (
    <div className="w-396pxr h-240pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center">
      <button onClick={onClose} className="top-22pxr right-20pxr absolute">
        <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
      </button>
      <div className="space-y-6pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">다운로드 파일 형식 선택하기</p>
        <p className="text-b3-rg text-gray-300">
          다운로드하고자 하시는 파일의 형식을 선택해주세요.
        </p>
      </div>
      <div className="space-y-6pxr mt-28pxr flex flex-col items-center justify-center">
        <FileDownloadButton onClick={onPdfDownload} buttonType={FileDownloadButtonType.PDF} />
        <FileDownloadButton onClick={onWordDownload} buttonType={FileDownloadButtonType.WORD} />
      </div>
    </div>
  );
};

export default DownloadModal;
