import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import DownArrowIcon from '@svgs/arrow/DownArrowIcon.svg';
import LeftArrowIcon from '@svgs/arrow/LeftArrowIcon.svg';
import RightArrowIcon from '@svgs/arrow/RightArrowIcon.svg';
import ChevronLeftMini from '@svgs/calendar/ChevronLeftMini.svg';
import ChevronRightMini from '@svgs/calendar/ChevronRightMini.svg';

import { ArrowIconsState } from './ArrowIcons.types';

const ArrowIcons = ({ state, className }: IconsCommonProps<ArrowIconsState>) => {
  switch (state) {
    case ArrowIconsState.LEFT:
      return <LeftArrowIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case ArrowIconsState.RIGHT:
      return <RightArrowIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case ArrowIconsState.DOWN:
      return <DownArrowIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case ArrowIconsState.CHEVRON_LEFT:
      return <ChevronLeftMini className={clsx('h-24pxr w-24pxr', className)} />;
    case ArrowIconsState.CHEVRON_RIGHT:
      return <ChevronRightMini className={clsx('h-24pxr w-24pxr', className)} />;
    default:
      return null;
  }
};

export default ArrowIcons;
