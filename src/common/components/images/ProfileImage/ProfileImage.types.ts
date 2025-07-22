import { ImageSize } from '../types/images.common.types';

export interface ProfileImageProps {
  src?: string;
  userId: string;
  name: string;
  size?: ImageSize;
}
