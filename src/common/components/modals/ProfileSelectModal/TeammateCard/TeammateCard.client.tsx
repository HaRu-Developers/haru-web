'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import DefaultProfileImage from '@common/components/images/DefaultProfileImage/DefaultProfileImage.client';
import { ImageSize } from '@common/components/images/types/images.common.types';

interface TeammateCardProps {
  name: string;
  userId: bigint;
  email: string;
  onClose: () => void;
}

const TeammateCard = ({ name, userId, email, onClose }: TeammateCardProps) => {
  return (
    <div className="rounded-7pxr gap-x-8pxr px-9pxr py-6pxr flex flex-row items-center justify-center bg-gray-600">
      <DefaultProfileImage name={name} userId={String(userId)} size={ImageSize.SMALL} />
      <div className="ml-8pxr flex w-full flex-col items-start justify-center">
        <p className="text-cap1-rg text-black">{name} </p>
        <p className="text-cap2-rg text-gray-300">{email}</p>
      </div>
      <button onClick={onClose}>
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} />
      </button>
    </div>
  );
};

export default TeammateCard;
