import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import CircleCheckboxDisabledIcon from '@svgs/checkbox/CircleCheckboxDisabledIcon.svg';
import CircleCheckboxEnabledIcon from '@svgs/checkbox/CircleCheckboxEnabledIcon.svg';
import SquareCheckboxDisabledIcon from '@svgs/checkbox/SquareCheckboxDisabledIcon.svg';
import SquareCheckboxEnabledIcon from '@svgs/checkbox/SquareCheckboxEnabledIcon.svg';

import { CheckboxIconsState } from './CheckboxIcons.types';

const CheckboxIcons = ({ state, className }: IconsCommonProps<CheckboxIconsState>) => {
  switch (state) {
    case CheckboxIconsState.CIRCLE_CHECKBOX_ENABLED:
      return <CircleCheckboxEnabledIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED:
      return <CircleCheckboxDisabledIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case CheckboxIconsState.SQUARE_CHECKBOX_ENABLED:
      return <SquareCheckboxEnabledIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case CheckboxIconsState.SQUARE_CHECKBOX_DISABLED:
      return <SquareCheckboxDisabledIcon className={clsx('h-20pxr w-20pxr', className)} />;
    case CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_ENABLED:
      return <SquareCheckboxEnabledIcon className={clsx('h-24pxr w-24pxr', className)} />;
    case CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_DISABLED:
      return <SquareCheckboxDisabledIcon className={clsx('h-24pxr w-24pxr', className)} />;
    default:
      return null;
  }
};

export default CheckboxIcons;
