import { ImageSize } from '../types/images.common.types';

export interface DefaultProfileImageProps {
  userId: number;
  name: string;
  color?: string;
  size?: ImageSize;
}
