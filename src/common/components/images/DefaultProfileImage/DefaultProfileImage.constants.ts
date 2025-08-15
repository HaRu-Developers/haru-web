import { ImageSize } from '../types/images.common.types';

export const sizeClassMap: Record<ImageSize, string> = {
  [ImageSize.SMALL]: 'text-cap2-rg h-4 w-4',
  [ImageSize.MEDIUM]: 'text-cap2-rg h-7 w-7',
  [ImageSize.LARGE]: 'text-b2-rg h-10 w-10',
};
