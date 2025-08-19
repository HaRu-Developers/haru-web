import Image from 'next/image';

import clsx from 'clsx';

import CalendarImage from '@assets/images/landing/MainCalendar.png';
import EventImage from '@assets/images/landing/MainEvents.png';
import MeetingImage from '@assets/images/landing/MainMeetings.png';
import MoodTrackerImage from '@assets/images/landing/MainMoodTracker.png';

import { FeatureButtonType } from '../../buttons/FeatureButton/FeatureButton.types';
import { BannerProps } from './Banner.types';

const Banner = ({ state }: BannerProps) => {
  const slideIndex = Object.values(FeatureButtonType).indexOf(state);

  const imageMap = {
    [FeatureButtonType.CALENDAR]: CalendarImage,
    [FeatureButtonType.EVENT]: EventImage,
    [FeatureButtonType.MEETING]: MeetingImage,
    [FeatureButtonType.MOODTRACKER]: MoodTrackerImage,
  };

  const slideClasses = ['slide-0', 'slide-1', 'slide-2', 'slide-3'];

  return (
    <div className="shadow-landing-page-banner rounded-t-28pxr w-871pxr h-475pxr flex shrink-0 items-center justify-center border-x-2 border-t-2 border-[#4A5568]">
      <div className="rounded-t-26pxr h-full w-full border-x-4 border-t-4 border-[#1A202C]">
        <div className="rounded-t-21pxr flex h-full w-full overflow-hidden border-x-8 border-t-8">
          <div
            className={clsx(
              'flex h-full w-full transition-transform duration-500',
              slideClasses[slideIndex],
            )}
          >
            {Object.values(FeatureButtonType).map((key) => (
              <div key={key} className="relative h-full w-full flex-shrink-0">
                <Image
                  src={imageMap[key]}
                  alt={`${key} 배너 이미지`}
                  fill={true}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
