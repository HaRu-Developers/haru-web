import { ReactNode } from 'react';

import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

export interface BaseListFileProps {
  id: number;
  title: string;
  subtitle: string;
  href: string;
  fileIconState: FeaturedFileIconsState;
  isCheckMode?: boolean;
  isChecked?: boolean;
  isSelectable?: boolean;
  onCheckToggle?: (id: number) => void;
  rightContent?: ReactNode;
  className?: string;
}
