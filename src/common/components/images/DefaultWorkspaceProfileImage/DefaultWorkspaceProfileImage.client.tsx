'use client';

import clsx from 'clsx';

import { PROFILE_COLORS } from '@common/constants/profile.constants';

import hashCode from '@common/utils/hash-code.utils';

import { DefaultWorkspaceProfileImageProps } from './DefaultWorkspaceProfileImage.types';

const DefaultWorkspaceProfileImage = ({
  workspaceId,
  title,
  className,
  color,
}: DefaultWorkspaceProfileImageProps) => {
  const initial = title.slice(0, 1);
  const colorIndex = hashCode(workspaceId) % PROFILE_COLORS.length;
  const backgroundColor = color ?? PROFILE_COLORS[colorIndex];

  return (
    <div
      className={clsx(
        `rounded-2pxr flex shrink-0 items-center justify-center text-white`,
        className,
      )}
      style={{ background: backgroundColor }}
      role="img"
      aria-label={`${title} 워크스페이스의 기본 프로필 이미지`}
    >
      <p>{initial}</p>
    </div>
  );
};

export default DefaultWorkspaceProfileImage;
