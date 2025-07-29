import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import OnboardingIllustrationCalendarIcon from '@svgs/onboarding-illustration/OnboardingIllustrationCalendar.svg';
import OnboardingIllustrationEventIcon from '@svgs/onboarding-illustration/OnboardingIllustrationEvent.svg';
import OnboardingIllustrationMeetingIcon from '@svgs/onboarding-illustration/OnboardingIllustrationMeeting.svg';
import OnboardingIllustrationMoodTrackerIcon from '@svgs/onboarding-illustration/OnboardingIllustrationMoodTracker.svg';
import OnboardingIllustrationWorkSpaceDefaultIcon from '@svgs/onboarding-illustration/OnboardingIllustrationWorkSpaceDefault.svg';

import { OnboardingIconsState } from './OnboardingIcons.types';

const OnboardingIcons = ({ state, className }: IconsCommonProps<OnboardingIconsState>) => {
  switch (state) {
    case OnboardingIconsState.CALENDAR:
      return <OnboardingIllustrationCalendarIcon className={clsx('h-32pxr w-32pxr', className)} />;
    case OnboardingIconsState.EVENT:
      return <OnboardingIllustrationEventIcon className={clsx('h-32pxr w-32pxr', className)} />;
    case OnboardingIconsState.MEETING:
      return <OnboardingIllustrationMeetingIcon className={clsx('h-32pxr w-32pxr', className)} />;
    case OnboardingIconsState.MOOD_TRACKER:
      return (
        <OnboardingIllustrationMoodTrackerIcon className={clsx('h-32pxr w-32pxr', className)} />
      );
    case OnboardingIconsState.WORKSPACE_DEFAULT:
      return (
        <OnboardingIllustrationWorkSpaceDefaultIcon
          className={clsx('h-56pxr w-56pxr', className)}
        />
      );
    default:
      return null;
  }
};

export default OnboardingIcons;
