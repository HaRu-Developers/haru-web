import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CopyIcon from '@svgs/feature-tab/CopyIcon.svg';
import EditIcon from '@svgs/feature-tab/EditIcon.svg';
import LinkIcon from '@svgs/feature-tab/LinkIcon.svg';

import { FeatureTabIconsState } from './FeatureTabIcons.types';

const FeatureTabIcons = ({ state, className }: IconsCommonProps<FeatureTabIconsState>) => {
  switch (state) {
    case FeatureTabIconsState.COPY:
      return <CopyIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case FeatureTabIconsState.EDIT:
      return <EditIcon className={clsx('h-[20px] w-[20px]', className)} />;
    case FeatureTabIconsState.LINK:
      return <LinkIcon className={clsx('h-[20px] w-[20px]', className)} />;
    default:
      return null;
  }
};

export default FeatureTabIcons;
