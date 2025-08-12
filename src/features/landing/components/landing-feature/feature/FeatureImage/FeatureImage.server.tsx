import Image from 'next/image';

import clsx from 'clsx';

import EventImage from '@assets/images/landing/FeatureEvents.png';
import MeetingImage from '@assets/images/landing/FeatureMeetings.png';
import MoodTracker from '@assets/images/landing/FeatureMoodTracker.png';

import { FileType } from '@common/types/file-type.enum';

import { FeatureImageProps } from './FeatureImage.types';

const FeatureImage = ({ fileType }: FeatureImageProps) => {
  const featureMap = {
    [FileType.AI_MEETING_MANAGER]: {
      imageSrc: MeetingImage,
      bgColorSize: 'bg-secondary-ai-meeting-bg pt-122pxr px-34pxr',
      imageSize: 'w-425pxr h-313pxr',
    },
    [FileType.SNS_EVENT_ASSISTANT]: {
      imageSrc: EventImage,
      bgColorSize: 'bg-secondary-event-bg pt-83pxr pl-85pxr',
      imageSize: 'w-413pxr h-352pxr',
    },
    [FileType.TEAM_MOOD_TRACKER]: {
      imageSrc: MoodTracker,
      bgColorSize: 'bg-secondary-mood-tracker-bg pl-160pxr pt-52pxr',
      imageSize: 'w-333pxr h-383pxr',
    },
  };
  const feature = featureMap[fileType];

  return (
    <div
      className={clsx(
        'w-493pxr h-435pxr rounded-12pxr border-stroke-200 shrink-0 overflow-hidden border',
        feature.bgColorSize,
      )}
    >
      <Image
        src={feature.imageSrc}
        alt={`Feature image for ${fileType}`}
        className={clsx('object-cover', feature.imageSize)}
      />
    </div>
  );
};

export default FeatureImage;
