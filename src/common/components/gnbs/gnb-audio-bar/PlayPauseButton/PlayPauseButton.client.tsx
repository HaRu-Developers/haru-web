'use client';

import clsx from 'clsx';

import AudioBarIcons from '@icons/AudioBarIcons/AudioBarIcons';
import { AudioBarIconsState } from '@icons/AudioBarIcons/AudioBarIcons.types';

import { PlayPauseButtonProps, PlayPauseButtonStatus } from './PlayPauseButton.types';

const PlayPauseButton = ({ status, className, ...props }: PlayPauseButtonProps) => {
  switch (status) {
    case PlayPauseButtonStatus.PLAY:
      return (
        <button
          className={clsx(
            'w-40pxr h-40pxr rounded-5pxr flex items-center justify-center bg-white hover:bg-gray-600',
            className,
          )}
          {...props}
        >
          <AudioBarIcons state={AudioBarIconsState.PLAY} />
        </button>
      );

    case PlayPauseButtonStatus.PAUSE:
      return (
        <button
          className={clsx(
            'w-40pxr h-40pxr rounded-5pxr flex items-center justify-center bg-white hover:bg-gray-600',
            className,
          )}
          {...props}
        >
          <AudioBarIcons state={AudioBarIconsState.PAUSE} />
        </button>
      );
  }
};

export default PlayPauseButton;
