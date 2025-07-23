'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';
import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';

import { WorkspaceProfileImageProps } from './WorkspaceProfileImage.types';

const WorkspaceProfileImage = ({ src, title, className }: WorkspaceProfileImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <LeftGnbIcons state={LeftGnbIconsState.RECENT_FILE} />;
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
