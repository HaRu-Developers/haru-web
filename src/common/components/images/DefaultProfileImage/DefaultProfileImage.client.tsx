'use client';

import clsx from 'clsx';

import { PROFILE_COLORS } from '@common/constants/profile.constants';

import hashCode from '@common/utils/hash-code.utils';

import { ImageSize } from '../types/images.common.types';
import { sizeClass } from './DefaultProfileImage.constants';
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
  // userId가 ''인 경우 반영
  const hashKey = userId?.trim() || name?.trim() || 'anonymous';
  // 같은 사용자면 같은 색상을 가지게
  const colorIndex = hashCode(hashKey) % PROFILE_COLORS.length;
  const backgroundColor = color ?? PROFILE_COLORS[colorIndex];

  return (
    <div
      className={clsx(
        `rounded-100pxr px-3pxr flex shrink-0 cursor-default items-center justify-center gap-2.5 py-1.5 text-white`,
        sizeClass[size],
      )}
      style={{ background: backgroundColor }}
      role="img"
      aria-label={`사용자 ${name}의 기본 프로필 이미지`}
    >
      <p>{initial}</p>
    </div>
  );
};

export default DefaultProfileImage;
