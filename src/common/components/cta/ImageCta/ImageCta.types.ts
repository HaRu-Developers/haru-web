import { CtaIconsState } from '@icons/Cta/CtaIcons.types';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { FileType } from '@common/types/file-type.enum';

export interface ImageCtaConfig {
  title: string;
  color: string;
  ctaIconState: CtaIconsState;
  plusIconState: PlusIconsState;
  marginBottom: string;
}

export interface ImageCtaProps {
  type: FileType;
  onClick: () => void;
}
