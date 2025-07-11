import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import DownArrowIcon from '@svgs/arrow/DownArrowIcon.svg';
import LeftArrowIcon from '@svgs/arrow/LeftArrowIcon.svg';
import RightArrowIcon from '@svgs/arrow/RightArrowIcon.svg';

import { ArrowIconsState } from './ArrowIcons.types';

const ArrowIcons = ({ state, className }: IconsCommonProps<ArrowIconsState>) => {
  switch (state) {
    case ArrowIconsState.LEFT:
      return <LeftArrowIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case ArrowIconsState.RIGHT:
      return <RightArrowIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case ArrowIconsState.DOWN:
      return <DownArrowIcon className={clsx('h-[20px] w-[20px]', className)} />;
    default:
      return null;
  }
};

export default ArrowIcons;
