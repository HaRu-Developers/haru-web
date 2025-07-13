'use client';

import { useState } from 'react';

import Image from 'next/image';

import DefaultProfileImage from '@common/components/DefaultProfileImage/DefaultProfileImage.server';

import { ProfileImageProps } from './ProfileImage.types';

const ProfileImage = ({ src, userId, name }: ProfileImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <DefaultProfileImage userId={userId} name={name} size="large" />;
  }

  return (
    <Image
      src={src}
      alt="프로필 이미지"
      width={40}
      height={40}
      className="rounded-100pxr"
      onError={() => setHasError(true)}
    />
  );
};

export default ProfileImage;
