'use client';

import clsx from 'clsx';

import AudioBarIcons from '@icons/AudioBarIcons/AudioBarIcons';
import { AudioBarIconsState } from '@icons/AudioBarIcons/AudioBarIcons.types';

import { StopRecordingButtonProps } from './StopRecordingButton.types';

/**
 * '녹음 종료' 버튼
 */
const StopRecordingButton = ({
  isEnding,
  className,
  onClick,
  ...props
}: StopRecordingButtonProps) => {
  return (
    <button
      className={clsx(
        'h-32pxr w-85pxr gap-x-4pxr rounded-100pxr px-10pxr py-9pxr inline-flex items-center justify-center bg-gray-600 text-gray-300',
        className,
      )}
      onClick={onClick}
      disabled={isEnding}
      {...props}
    >
      {!isEnding && <AudioBarIcons state={AudioBarIconsState.STOP_RECORDING} />}
      <p className="text-bt3-sb whitespace-nowrap">{isEnding ? '종료 중...' : '녹음 종료'}</p>
    </button>
  );
};

export default StopRecordingButton;
