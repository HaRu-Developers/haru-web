import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import ClosedEyeIcon from '@svgs/eye/ClosedEyeIcon.svg';
import OpenedEyeIcon from '@svgs/eye/OpenedEyeIcon.svg';

import { EyeIconsState } from './EyeIcons.types';

const EyeIcons = ({ state, className }: IconsCommonProps<EyeIconsState>) => {
  switch (state) {
    case EyeIconsState.CLOSED:
      return <ClosedEyeIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case EyeIconsState.OPENED:
      return <OpenedEyeIcon className={clsx('h-20pxr w-20pxr', className)} />;
    default:
      return null;
  }
};

export default EyeIcons;
