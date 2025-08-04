import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CalendarIcon from '@svgs/landing/LandingCalendar.svg';
import EventIcon from '@svgs/landing/LandingEvent.svg';
import MeetingIcon from '@svgs/landing/LandingMeeting.svg';
import MoodTracker from '@svgs/landing/LandingMoodTracker.svg';

import { LandingFeatureIconsState } from './LandingFeatureIcons.types';

const LandingFeatureIcons = ({ state, className }: IconsCommonProps<LandingFeatureIconsState>) => {
  switch (state) {
    case LandingFeatureIconsState.SIZE_24_CALENDAR:
      return (
        <CalendarIcon className={clsx('h-24pxr w-24pxr text-secondary-calendar', className)} />
      );
    case LandingFeatureIconsState.SIZE_24_EVENT:
      return <EventIcon className={clsx('h-24pxr w-24pxr text-secondary-event', className)} />;
    case LandingFeatureIconsState.SIZE_24_MEETING:
      return (
        <MeetingIcon className={clsx('h-24pxr w-24pxr text-secondary-ai-meeting', className)} />
      );
    case LandingFeatureIconsState.SIZE_24_MOODTRACKER:
      return (
        <MoodTracker className={clsx('h-24pxr w-24pxr text-secondary-mood-tracker', className)} />
      );
    case LandingFeatureIconsState.SIZE_24_CALENDAR_WHITE:
      return <CalendarIcon className={clsx('h-24pxr w-24pxr text-white', className)} />;
    case LandingFeatureIconsState.SIZE_24_EVENT_WHITE:
      return <EventIcon className={clsx('h-24pxr w-24pxr text-white', className)} />;
    case LandingFeatureIconsState.SIZE_24_MEETING_WHITE:
      return <MeetingIcon className={clsx('h-24pxr w-24pxr text-white', className)} />;
    case LandingFeatureIconsState.SIZE_24_MOODTRACKER_WHITE:
      return <MoodTracker className={clsx('h-24pxr w-24pxr text-white', className)} />;
    case LandingFeatureIconsState.SIZE_62_EVENT:
      return <EventIcon className={clsx('h-62pxr w-62pxr text-secondary-event', className)} />;
    case LandingFeatureIconsState.SIZE_62_MEETING:
      return (
        <MeetingIcon className={clsx('h-62pxr w-62pxr text-secondary-ai-meeting', className)} />
      );
    case LandingFeatureIconsState.SIZE_62_MOODTRACKER:
      return (
        <MoodTracker className={clsx('h-62pxr w-62pxr text-secondary-mood-tracker', className)} />
      );
    default:
      return null;
  }
};

export default LandingFeatureIcons;
