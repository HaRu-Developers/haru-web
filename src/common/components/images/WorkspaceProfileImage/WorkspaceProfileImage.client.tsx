'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import DefaultWorkspaceProfileImage from '../DefaultWorkspaceProfileImage/DefaultWorkspaceProfileImage.client';
import { WorkspaceProfileImageProps } from './WorkspaceProfileImage.types';

const WorkspaceProfileImage = ({ src, title, className, border }: WorkspaceProfileImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <DefaultWorkspaceProfileImage title={title} className={className} border={border} />;
  }

  return (
    <div className={clsx(`rounded-8pxr relative`, className)}>
      <Image
        src={src}
        alt={`${title} 워크스페이스 프로필 이미지`}
        fill
        style={{ objectFit: 'cover', borderRadius: '8px' }} // 이미지에 border-radius 적용
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default WorkspaceProfileImage;
