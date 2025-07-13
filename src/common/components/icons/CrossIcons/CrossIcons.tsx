import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CrossIcon from '@svgs/cross/CrossIcon.svg';

import { CrossIconsState } from './CrossIcons.types';

const CrossIcons = ({ state, className }: IconsCommonProps<CrossIconsState>) => {
  switch (state) {
    case CrossIconsState.SIZE_24_GRAY_200:
      return <CrossIcon className={clsx('h-[24px] w-[24px] text-gray-200', className)} />;
    case CrossIconsState.SIZE_16_GRAY_200:
      return <CrossIcon className={clsx('h-[16px] w-[16px] text-gray-200', className)} />;
    case CrossIconsState.SIZE_16_GRAY_400:
      return <CrossIcon className={clsx('h-[16px] w-[16px] text-gray-400', className)} />;
    case CrossIconsState.SIZE_20_GRAY_200:
      return <CrossIcon className={clsx('h-[20px] w-[20px] text-gray-200', className)} />;
    default:
      return null;
  }
};

export default CrossIcons;
