'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import { WorkspaceProfileImageProps } from './WorkspaceProfileImage.types';

const WorkspaceProfileImage = ({ src, title, className }: WorkspaceProfileImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    // TODO: 여기에 기본 이미지
    return;
  }

  return (
    <div className={clsx(`relative`, className)}>
      <Image
        src={src}
        alt={`${title} 워크스페이스 프로필 이미지`}
        fill
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default WorkspaceProfileImage;
