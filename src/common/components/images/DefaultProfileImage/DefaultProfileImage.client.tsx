'use client';

import clsx from 'clsx';

import { PROFILE_COLORS } from '@common/constants/profile.constants';

import hashCode from '@common/utils/hash-code.utils';

import { ImageSize } from '../types/images.common.types';
import { sizeClassMap } from './DefaultProfileImage.constants';
import { DefaultProfileImageProps } from './DefaultProfileImage.types';

const DefaultProfileImage = ({
  name,
  userId,
  color,
  size = ImageSize.MEDIUM,
}: DefaultProfileImageProps) => {
  const sizeClass = sizeClassMap[size];

  // name이 문자열이 아니거나 비어있으면, 에러를 발생시키는 대신 안전한 대체 UI를 렌더링합니다.
  if (typeof name !== 'string' || !name) {
    return (
      <div
        className={clsx(
          `rounded-100pxr flex shrink-0 items-center justify-center bg-gray-300`, // 임의 회색 배경
          sizeClass,
        )}
        role="img"
        aria-label="사용자 프로필 이미지 로딩 중"
      />
    );
  }

  // 여기서부터는 name이 string인 상태임
  const initial = name.slice(0, 1);
  const hashKey =
    typeof userId === 'string'
      ? userId.trim()
      : String(userId ?? '').trim() || name?.trim() || 'anonymous';
  // 같은 사용자면 같은 색상을 가지게
  const colorIndex = hashCode(hashKey) % PROFILE_COLORS.length;
  const backgroundColor = color ?? PROFILE_COLORS[colorIndex];

  return (
    <div
      className={clsx(
        `rounded-100pxr px-3pxr flex shrink-0 cursor-default items-center justify-center gap-2.5 py-1.5 text-white`,
        sizeClass,
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
