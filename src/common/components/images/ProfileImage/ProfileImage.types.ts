import { ImageSize } from '../types/images.common.types';

export interface ProfileImageProps {
  src: string | null;
  userId: number;
  name: string;
  size?: ImageSize;
}
