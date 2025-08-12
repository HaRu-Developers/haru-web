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
      return <StartRecordingIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case AudioBarIconsState.STOP_RECORDING:
      return <EndRecordingIcon className={clsx('h-14pxr w-14pxr', className)} />;
    case AudioBarIconsState.PAUSE:
      return <PauseIcon className={clsx('h-18pxr w-18pxr', className)} />;
    case AudioBarIconsState.PLAY:
      return <PlayIcon className={clsx('h-18pxr w-18pxr', className)} />;
    default:
      return null;
  }
};

export default AudioBarIcons;
