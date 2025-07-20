import { ImageSize } from '@common/types/images.types';

export interface DefaultProfileImageProps {
  userId: string;
  name: string;
  color?: string;
  size?: ImageSize;
}
