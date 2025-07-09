import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import PlusIcon from '@svgs/plus/PlusIcon.svg';

import { PlusIconsState } from './PlusIcons.types';

const PlusIcons = ({ state, className }: IconsCommonProps<PlusIconsState>) => {
  switch (state) {
    case PlusIconsState.SIZE_20_GRAY_400:
      return <PlusIcon className={clsx('h-[20px] w-[20px] text-gray-400', className)} />;
    case PlusIconsState.SIZE_16_GRAY_300:
      return <PlusIcon className={clsx('h-[16px] w-[16px] text-gray-300', className)} />;
    case PlusIconsState.SIZE_20_PRIMARY:
      return <PlusIcon className={clsx('text-primary h-[20px] w-[20px]', className)} />;
    case PlusIconsState.SIZE_16_PRIMARY:
      return <PlusIcon className={clsx('text-primary h-[16px] w-[16px]', className)} />;
    case PlusIconsState.SIZE_20_SECONDARY_GREEN:
      return <PlusIcon className={clsx('text-secondary-green h-[20px] w-[20px]', className)} />;
    case PlusIconsState.SIZE_16_SECONDARY_GREEN:
      return <PlusIcon className={clsx('text-secondary-green h-[16px] w-[16px]', className)} />;
    case PlusIconsState.SIZE_20_SECONDARY_BLUE:
      return <PlusIcon className={clsx('text-secondary-blue h-[20px] w-[20px]', className)} />;
    case PlusIconsState.SIZE_16_SECONDARY_BLUE:
      return <PlusIcon className={clsx('text-secondary-blue h-[16px] w-[16px]', className)} />;
    default:
      return null;
  }
};

export default PlusIcons;
