import Image from 'next/image';

import clsx from 'clsx';

import EventExplanationImage from '@assets/images/landing/FeatureEventExplanation.png';
import EventImage from '@assets/images/landing/FeatureEvents.png';
import MeetingExplanationImage from '@assets/images/landing/FeatureMeetingExplanation.png';
import MeetingImage from '@assets/images/landing/FeatureMeetings.png';
import MoodTrackerImage from '@assets/images/landing/FeatureMoodTracker.png';
import MoodTrackerExplanationImage from '@assets/images/landing/FeatureMoodTrackerExplanation.png';

import { FileType } from '@common/types/file-type.enum';

import { FeatureImageProps } from './FeatureImage.types';

const FeatureImage = ({ fileType }: FeatureImageProps) => {
  const featureMap = {
    [FileType.AI_MEETING_MANAGER]: {
      imageSrc: MeetingImage,
      explanationImageSrc: MeetingExplanationImage,
      bgColor: 'bg-secondary-ai-meeting-bg',
      bgSize: 'pt-122pxr px-34pxr',
      imageSize: 'w-425pxr h-313pxr',
    },
    [FileType.SNS_EVENT_ASSISTANT]: {
      imageSrc: EventImage,
      explanationImageSrc: EventExplanationImage,
      bgColor: 'bg-secondary-event-bg',
      bgSize: 'pt-83pxr pl-85pxr',
      imageSize: 'w-413pxr h-352pxr',
    },
    [FileType.TEAM_MOOD_TRACKER]: {
      imageSrc: MoodTrackerImage,
      explanationImageSrc: MoodTrackerExplanationImage,
      bgColor: 'bg-secondary-mood-tracker-bg',
      bgSize: 'pl-160pxr pt-52pxr',
      imageSize: 'w-333pxr h-383pxr',
    },
  };
  const feature = featureMap[fileType];

  return (
    <div className="relative bg-white">
      <div
        className={clsx(
          'w-493pxr h-435pxr rounded-12pxr border-stroke-200 shrink-0 overflow-hidden border',
          feature.bgColor,
          feature.bgSize,
        )}
      >
        <Image
          src={feature.imageSrc}
          alt={`Feature image for ${fileType}`}
          className={clsx('object-cover', feature.imageSize)}
        />
      </div>
      <div className="absolute top-0 z-1 opacity-0 transition duration-600 hover:bg-white hover:opacity-100">
        <Image
          src={feature.explanationImageSrc}
          alt={`Feature image for ${fileType}`}
          className={clsx(
            'h-full w-full object-cover opacity-0 transition duration-600 hover:opacity-100',
            feature.bgColor,
          )}
        />
      </div>
    </div>
  );
};

export default FeatureImage;
