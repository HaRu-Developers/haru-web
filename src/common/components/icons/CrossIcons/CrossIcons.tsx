import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CrossIcon from '@svgs/cross/CrossIcon.svg';

import { CrossIconsState } from './CrossIcons.types';

const CrossIcons = ({ state, className }: IconsCommonProps<CrossIconsState>) => {
  switch (state) {
    case CrossIconsState.SIZE_24_GRAY_200:
      return <CrossIcon className={clsx('h-24pxr w-24pxr text-gray-200', className)} />;
    case CrossIconsState.SIZE_16_GRAY_200:
      return <CrossIcon className={clsx('h-16pxr w-16pxr text-gray-200', className)} />;
    case CrossIconsState.SIZE_16_GRAY_400:
      return <CrossIcon className={clsx('h-16pxr w-16pxr text-gray-400', className)} />;
    case CrossIconsState.SIZE_20_GRAY_200:
      return <CrossIcon className={clsx('h-20pxr w-20pxr text-gray-200', className)} />;
    default:
      return null;
  }
};

export default CrossIcons;
