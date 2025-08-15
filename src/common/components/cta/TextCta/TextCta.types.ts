import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { FileType } from '@common/types/file-type.enum';

export interface TextCtaConfig {
  iconState: PlusIconsState;
  color: string;
}

export interface TextCtaProps {
  type: FileType;
  onClick?: () => void;
  disabled?: boolean;
}
