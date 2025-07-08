import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import SpeakingUserIcon from '@svgs/speaker/SpeakingUserIcon.svg';

import { SpeakerIconsState } from './SpeakerIcons.types';

const SpeakerIcons = ({ state, className }: IconsCommonProps<SpeakerIconsState>) => {
  switch (state) {
    case SpeakerIconsState.USER_1:
      return <SpeakingUserIcon className={clsx('text-primary h-[32px] w-[32px]', className)} />;
    case SpeakerIconsState.USER_2:
      return (
        <SpeakingUserIcon className={clsx('text-secondary-green h-[32px] w-[32px]', className)} />
      );
    case SpeakerIconsState.USER_3:
      return (
        <SpeakingUserIcon className={clsx('text-secondary-blue h-[32px] w-[32px]', className)} />
      );
    case SpeakerIconsState.USER_4:
      return <SpeakingUserIcon className={clsx('text-file-icon h-[32px] w-[32px]', className)} />;
    case SpeakerIconsState.USER_5:
      return <SpeakingUserIcon className={clsx('text-audio-bar h-[32px] w-[32px]', className)} />;
    case SpeakerIconsState.USER_6:
      return <SpeakingUserIcon className={clsx('text-system-red h-[32px] w-[32px]', className)} />;
    case SpeakerIconsState.USER_7:
      return <SpeakingUserIcon className={clsx('h-[32px] w-[32px] text-gray-200', className)} />;
    default:
      return null;
  }
};

export default SpeakerIcons;
