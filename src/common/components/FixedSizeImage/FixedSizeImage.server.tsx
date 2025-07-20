import Image from 'next/image';

import clsx from 'clsx';

import { FixedSizeImageProps } from './FixedSizeImage.types';

/**
 * 지정한 크기를 채우며 넘치는 부분은 잘리는 이미지 컴포넌트
 */
const FixedSizeImage = ({ src, alt, className }: FixedSizeImageProps) => {
  return (
    <div className={clsx(`relative`, className)}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default FixedSizeImage;
