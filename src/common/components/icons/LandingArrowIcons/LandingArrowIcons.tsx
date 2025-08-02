import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import RightArrowIcon from '@svgs/landing/LandingRightArrow.svg';
import UpRightArrowIcon from '@svgs/landing/LandingUpRightArrow.svg';

import { LandingArrowIconsState } from './LandingArrowIcons.types';

const LandingArrowIcons = ({ state, className }: IconsCommonProps<LandingArrowIconsState>) => {
  switch (state) {
    case LandingArrowIconsState.RIGHT_ARROW:
      return <RightArrowIcon className={clsx('h-16pxr w-16pxr', className)} />;
    case LandingArrowIconsState.UP_RIGHT_ARROW:
      return <UpRightArrowIcon className={clsx('h-18pxr w-18pxr', className)} />;
    default:
      return null;
  }
};

export default LandingArrowIcons;
