'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import DefaultProfileImage from '@common/components/images/DefaultProfileImage/DefaultProfileImage.client';

import { ImageSize } from '../types/images.common.types';
import { ProfileImageProps } from './ProfileImage.types';

const ProfileImage = ({ src, userId, name, size = ImageSize.MEDIUM }: ProfileImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <DefaultProfileImage name={name} size={size} />;
  }

  const sizeClassMap: Record<ImageSize, string> = {
    [ImageSize.SMALL]: 'text-cap2-rg h-4 w-4',
    [ImageSize.MEDIUM]: 'text-cap2-rg h-7 w-7',
    [ImageSize.LARGE]: 'text-b2-rg h-10 w-10',
  };

  const sizeClass = sizeClassMap[size] ?? sizeClassMap[ImageSize.MEDIUM];

  return (
    <div className={clsx('relative', sizeClass)}>
      <Image
        src={src}
        alt="프로필 이미지"
        fill
        style={{ objectFit: 'cover', borderRadius: '100px' }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default ProfileImage;
