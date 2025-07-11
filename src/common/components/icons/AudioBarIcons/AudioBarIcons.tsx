import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import EndRecordingIcon from '@svgs/audio-bar/EndRecordingIcon.svg';
import PauseIcon from '@svgs/audio-bar/PauseIcon.svg';
import PlayIcon from '@svgs/audio-bar/PlayIcon.svg';
import StartRecordingIcon from '@svgs/audio-bar/StartRecordingIcon.svg';

import { AudioBarIconsState } from './AudioBarIcons.types';

const AudioBarIcons = ({ state, className }: IconsCommonProps<AudioBarIconsState>) => {
  switch (state) {
    case AudioBarIconsState.START_RECORDING:
      return <StartRecordingIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case AudioBarIconsState.STOP_RECORDING:
      return <EndRecordingIcon className={clsx('h-[14px] w-[14px]', className)} />;
    case AudioBarIconsState.PAUSE:
      return <PauseIcon className={clsx('h-[18px] w-[18px]', className)} />;
    case AudioBarIconsState.PLAY:
      return <PlayIcon className={clsx('h-[18px] w-[18px]', className)} />;
    default:
      return null;
  }
};

export default AudioBarIcons;
