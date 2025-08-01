import { ImageSize } from '../types/images.common.types';

export interface DefaultProfileImageProps {
  userId: string | number;
  name: string;
  color?: string;
  size?: ImageSize;
}
