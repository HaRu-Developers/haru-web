import { profileColors } from '@common/constants/profile';

import { DefaultProfileImageProps } from './DefaultProfileImage.types';

const DefaultProfileImage = ({ name = '', color, size = 'large' }: DefaultProfileImageProps) => {
  const initial = name.slice(0, 2);
  // 같은 이름이면 같은 색상을 가지게
  const colorIndex = name ? name.charCodeAt(0) % profileColors.length : 0;
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
