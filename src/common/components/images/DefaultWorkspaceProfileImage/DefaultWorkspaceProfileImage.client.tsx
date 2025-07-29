'use client';

import clsx from 'clsx';

import { DefaultWorkspaceProfileImageProps } from './DefaultWorkspaceProfileImage.types';

const DefaultWorkspaceProfileImage = ({
  title,
  className,
  border,
}: DefaultWorkspaceProfileImageProps) => {
  const initial = title.slice(0, 1);

  return (
    <div
      className={clsx(
        `rounded-8pxr flex shrink-0 items-center justify-center bg-white text-black`,
        className,
        border ? 'border-stroke-100 border' : '',
      )}
      role="img"
      aria-label={`${title} 워크스페이스의 기본 프로필 이미지`}
    >
      <p className="cursor-defualt">{initial}</p>
    </div>
  );
};

export default DefaultWorkspaceProfileImage;
