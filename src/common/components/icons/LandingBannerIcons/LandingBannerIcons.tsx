import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import UnderbarIcons from '@svgs/landing/LandingUnderbar.svg';

import { LandingBannerIconsState } from './LandingBannerIcons.types';

const LandingBannerIcons = ({ state, className }: IconsCommonProps<LandingBannerIconsState>) => {
  switch (state) {
    case LandingBannerIconsState.UNDERBAR:
      return <UnderbarIcons className={clsx('h-10pxr w-336pxr', className)} />;
    default:
      return null;
  }
};

export default LandingBannerIcons;
