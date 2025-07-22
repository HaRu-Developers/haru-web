'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import ProgressBar from '@common/components/ProgressBar/ProgressBar.server';

import { ProgressModalProps } from './ProgressModal.types';

const ProgressModal = ({ onClose, progress }: ProgressModalProps) => {
  const mainText = progress !== 100 ? '다운로드 진행 중...' : '다운로드 완료!';
  const subText =
    progress !== 100
      ? '파일을 다운로드하고 있어요. 조금만 기다려주세요!'
      : '다운로드가 완료됐어요. 파일을 확인해 보세요!';

  return (
    <div className="w-396pxr h-240pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center">
      <button onClick={onClose} className="top-22pxr right-20pxr absolute">
        <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
      </button>
      <div className="gap-y-6pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">{mainText}</p>
        <p className="text-b3-rg text-gray-300">{subText}</p>
      </div>
      <div className="mt-41pxr">
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default ProgressModal;
