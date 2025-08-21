import { ReactNode } from 'react';

import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

export interface BaseListFileProps {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  fileIconState: FeaturedFileIconsState;
  isCheckMode?: boolean;
  isChecked?: boolean;
  isSelectable?: boolean;
  onCheckToggle?: (id: string) => void;
  rightContent?: ReactNode;
  className?: string;
}
