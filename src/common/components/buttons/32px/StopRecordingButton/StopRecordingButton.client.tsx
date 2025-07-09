'use client';

import clsx from 'clsx';

import AudioBarIcons from '@icons/AudioBarIcons/AudioBarIcons';
import { AudioBarIconsState } from '@icons/AudioBarIcons/AudioBarIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '녹음 종료' 버튼
 */
const StopRecordingButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt3-sb inline-flex h-[32px] w-[85px] items-center justify-center space-x-[4px] rounded-[100px] bg-gray-600 px-[10px] py-[9px] text-gray-300',
      )}
      onClick={onClick}
      {...props}
    >
      <AudioBarIcons state={AudioBarIconsState.STOP_RECORDING} />
      <p>녹음 종료</p>
    </button>
  );
};

export default StopRecordingButton;
