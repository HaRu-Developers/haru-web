'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import LoadingBar from '@common/components/LoadingBar/LoadingBar.server';
import ProgressBar from '@common/components/ProgressBar/ProgressBar.server';

import { LoadingModalProps, LoadingModalType } from './LoadingModal.types';

const LoadingModal = ({ onClose, modalType }: LoadingModalProps) => {
  const bar = <LoadingBar />;
  const modalTexts = {
    [LoadingModalType.CREATE_SURVEY]: {
      main: '설문지 생성 중...',
      sub: 'HaRu가 팀 설문지를 생성 중이에요.',
    },
    [LoadingModalType.MEETING_MINUTES]: {
      main: '회의록 작성 중...',
      sub: 'HaRu가 AI 회의록을 작성 중이에요.',
    },
    [LoadingModalType.SNS_EVENT]: {
      main: '참여자 및 당첨자 리스트 생성 중...',
      sub: 'HaRu가 이벤트 참여자 및 당첨자 리스트를 생성 중이에요.',
    },
  };

  return (
    <div className="w-396pxr h-240pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center">
      <button onClick={onClose} className="top-22pxr right-20pxr absolute">
        <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
      </button>
      <div className="space-y-6pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">{modalTexts[modalType].main}</p>
        <p className="text-b3-rg text-gray-300">{modalTexts[modalType].sub}</p>
      </div>
      <div className="mt-41pxr">{bar}</div>
    </div>
  );
};

export default LoadingModal;
