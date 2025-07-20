import { ImageSize } from '@common/types/images.types';

export interface ProfileImageProps {
  src?: string;
  userId: string;
  name: string;
  size?: ImageSize;
}
