import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import LeftGnbAiManagerIcon from '@svgs/gnb/left/LeftGnbAiManagerIcon.svg';
import LeftGnbHomeIcon from '@svgs/gnb/left/LeftGnbHomeIcon.svg';
import LeftGnbMyCalendarIcon from '@svgs/gnb/left/LeftGnbMyCalendarIcon.svg';
import LeftGnbRecentFileIcon from '@svgs/gnb/left/LeftGnbRecentFileIcon.svg';
import LeftGnbSnsAssistantIcon from '@svgs/gnb/left/LeftGnbSnsAssistantIcon.svg';
import LeftGnbTeamMoodTrackerIcon from '@svgs/gnb/left/LeftGnbTeamMoodTrackerIcon.svg';

import { LeftGnbIconsState } from './LeftGnbIcons.types';

const LeftGnbIcons = ({ state, className }: IconsCommonProps<LeftGnbIconsState>) => {
  switch (state) {
    case LeftGnbIconsState.AI_MANAGER:
      return <LeftGnbAiManagerIcon className={clsx('h-[20px] w-[20px] text-black', className)} />;
    case LeftGnbIconsState.AI_MANAGER_DISABLED:
      return (
        <LeftGnbAiManagerIcon className={clsx('h-[20px] w-[20px] text-gray-200', className)} />
      );
    case LeftGnbIconsState.HOME:
      return <LeftGnbHomeIcon className={clsx('h-[20px] w-[20px] text-black', className)} />;
    case LeftGnbIconsState.HOME_DISABLED:
      return <LeftGnbHomeIcon className={clsx('h-[20px] w-[20px] text-gray-200', className)} />;
    case LeftGnbIconsState.MY_CALENDAR:
      return <LeftGnbMyCalendarIcon className={clsx('h-[20px] w-[20px] text-black', className)} />;
    case LeftGnbIconsState.MY_CALENDAR_DISABLED:
      return (
        <LeftGnbMyCalendarIcon className={clsx('h-[20px] w-[20px] text-gray-200', className)} />
      );
    case LeftGnbIconsState.SNS_ASSISTANT:
      return (
        <LeftGnbSnsAssistantIcon className={clsx('h-[20px] w-[20px] text-black', className)} />
      );
    case LeftGnbIconsState.SNS_ASSISTANT_DISABLED:
      return (
        <LeftGnbSnsAssistantIcon className={clsx('h-[20px] w-[20px] text-gray-200', className)} />
      );
    case LeftGnbIconsState.TEAM_MOOD_TRACKER:
      return (
        <LeftGnbTeamMoodTrackerIcon className={clsx('h-[20px] w-[20px] text-black', className)} />
      );
    case LeftGnbIconsState.TEAM_MOOD_TRACKER_DISABLED:
      return (
        <LeftGnbTeamMoodTrackerIcon
          className={clsx('h-[20px] w-[20px] text-gray-200', className)}
        />
      );
    case LeftGnbIconsState.RECENT_FILE:
      return (
        <LeftGnbRecentFileIcon className={clsx('h-[20px] w-[20px] text-gray-200', className)} />
      );
    default:
      return null;
  }
};

export default LeftGnbIcons;
