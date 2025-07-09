import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CreateAiManagerIcon from '@svgs/cta/CreateAiManagerIcon.svg';
import CreateSnsEventAssistantIcon from '@svgs/cta/CreateSnsEventAssistantIcon.svg';
import CreateTeamMoodTrackerIcon from '@svgs/cta/CreateTeamMoodTrackerIcon.svg';

import { CtaIconsState } from './CtaIcons.types';

const CtaIcons = ({ state, className }: IconsCommonProps<CtaIconsState>) => {
  switch (state) {
    case CtaIconsState.AI_MEETING_MANAGER:
      return <CreateAiManagerIcon className={clsx('h-[96px] w-[91px]', className)} />;
    case CtaIconsState.SNS_EVENT_ASSISTANT:
      return <CreateSnsEventAssistantIcon className={clsx('h-[97px] w-[132px]', className)} />;
    case CtaIconsState.TEAM_MOOD_TRACKER:
      return <CreateTeamMoodTrackerIcon className={clsx('h-[107px] w-[113px]', className)} />;
    default:
      return null;
  }
};

export default CtaIcons;
