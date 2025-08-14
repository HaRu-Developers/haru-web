'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import DefaultProfileImage from '@common/components/images/DefaultProfileImage/DefaultProfileImage.client';

import { ImageSize } from '../types/images.common.types';
import { sizeClass } from './ProfileImage.constants';
import { ProfileImageProps } from './ProfileImage.types';

const ProfileImage = ({ src, userId, name, size = ImageSize.MEDIUM }: ProfileImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <DefaultProfileImage userId={userId} name={name} size={size} />;
  }

  return (
    <div className={clsx('relative', sizeClass[size])}>
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
