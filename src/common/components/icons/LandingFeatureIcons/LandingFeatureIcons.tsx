import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CalendarIcon from '@svgs/Landing/LandingCalendar.svg';
import EventIcon from '@svgs/Landing/LandingEvent.svg';
import MeetingIcon from '@svgs/Landing/LandingMeeting.svg';
import MoodTracker from '@svgs/LandingLandingMoodTracker.svg';

import { LandingFeatureIconsState } from './LandingFeatureIcons.types';

const LandingFeatureIcons = ({ state, className }: IconsCommonProps<LandingFeatureIconsState>) => {
  switch (state) {
    case LandingFeatureIconsState.SIZE_24_CALENDAR:
      return <CalendarIcon className={clsx('h-24pxr w-24pxr', className)} />;
    case LandingFeatureIconsState.SIZE_24_EVENT:
      return <EventIcon className={clsx('h-24pxr w-24pxr', className)} />;
    case LandingFeatureIconsState.SIZE_24_MEETING:
      return <MeetingIcon className={clsx('h-24pxr w-24pxr', className)} />;
    case LandingFeatureIconsState.SIZE_24_MOODTRACKER:
      return <MoodTracker className={clsx('h-24pxr w-24pxr', className)} />;
    case LandingFeatureIconsState.SIZE_62_EVENT:
      return <EventIcon className={clsx('h-62pxr w-62pxr', className)} />;
    case LandingFeatureIconsState.SIZE_62_MEETING:
      return <MeetingIcon className={clsx('h-62pxr w-62pxr', className)} />;
    case LandingFeatureIconsState.SIZE_62_MOODTRACKER:
      return <MoodTracker className={clsx('h-62pxr w-62pxr', className)} />;
    default:
      return null;
  }
};

export default LandingFeatureIcons;
