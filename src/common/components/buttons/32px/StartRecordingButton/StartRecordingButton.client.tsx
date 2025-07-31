'use client';

import clsx from 'clsx';

import AudioBarIcons from '@icons/AudioBarIcons/AudioBarIcons';
import { AudioBarIconsState } from '@icons/AudioBarIcons/AudioBarIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

const StartRecordingButton = ({ className, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'w-87pxr rounded-100pxr h-32pxr px-10pxr gap-x-4pxr flex flex-row items-center bg-gray-600',
        className,
      )}
      {...props}
    >
      <AudioBarIcons state={AudioBarIconsState.START_RECORDING} />
      <span className="text-bt3-sb whitespace-nowrap text-black">녹음 시작</span>
    </button>
  );
};

export default StartRecordingButton;
