'use client';

import clsx from 'clsx';

import { PROFILE_COLORS } from '@common/constants/profile.constants';

import hashCode from '@common/utils/hash-code';

import { ImageSize } from '../types/images.common.types';
import { DefaultProfileImageProps } from './DefaultProfileImage.types';

const DefaultProfileImage = ({
  name,
  userId,
  color,
  size = ImageSize.SMALL,
}: DefaultProfileImageProps) => {
  // TODO: 한 글자만 추출
  // 구글 로그인시 lastName의 한 글자 추출
  // 일반 로그인시 한 글자 추출
  const initial = name.slice(0, 1);
  // 같은 사용자면 같은 색상을 가지게
  const colorIndex = hashCode(userId) % PROFILE_COLORS.length;
  const backgroundColor = color ?? PROFILE_COLORS[colorIndex];

  const sizeClass = size === ImageSize.SMALL ? 'text-cap2-rg h-7 w-7 ' : 'text-b2-rg h-10 w-10';

  return (
    <div
      className={clsx(
        `rounded-100pxr px-3pxr flex shrink-0 items-center justify-center gap-2.5 py-1.5 text-white`,
        sizeClass,
      )}
      style={{ background: backgroundColor }}
    >
      <p>{initial}</p>
    </div>
  );
};

export default DefaultProfileImage;
