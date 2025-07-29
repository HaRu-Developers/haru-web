import { ImageSize } from '../types/images.common.types';

export interface ProfileImageProps {
  src: string | null;
  userId: string;
  name: string;
  size?: ImageSize;
}
