import { profileColors } from '@common/constants/profile';

import hashCode from '@common/utils/hashCode';

import { DefaultProfileImageProps } from './DefaultProfileImage.types';

const DefaultProfileImage = ({ name, userId, color, size = 'large' }: DefaultProfileImageProps) => {
  const initial = name.slice(0, 2);
  // 같은 사용자면 같은 색상을 가지게
  const colorIndex = hashCode(userId) % profileColors.length;
  const backgroundColor = color ?? profileColors[colorIndex];

  const sizeClass =
    size === 'small'
      ? 'text-cap2-rg h-7 w-7 rounded-[100px] px-[3px] py-1.5'
      : 'text-b2-rg h-10 w-10 rounded-[100px] px-[3px] py-1.5';

  return (
    <div
      className={`flex shrink-0 items-center justify-center gap-2.5 ${sizeClass}`}
      style={{ background: backgroundColor }}
    >
      <p>{initial}</p>
    </div>
  );
};

export default DefaultProfileImage;
