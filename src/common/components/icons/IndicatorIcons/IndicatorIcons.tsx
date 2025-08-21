import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import { IndicatorIconsState } from './IndicatorIcons.types';

const BarIndicator = ({ disabled }: { disabled?: boolean }) => {
  return (
    <div
      className={clsx(
        'h-[5px] w-[36px] rounded-[100px]',
        disabled ? 'bg-stroke-200' : 'bg-primary',
      )}
    />
  );
};

const IndicatorIcons = ({ state }: IconsCommonProps<IndicatorIconsState>) => {
  switch (state) {
    case IndicatorIconsState.BAR_STEP_1:
      return (
        <div className="gap-x-7pxr flex items-center justify-center">
          <BarIndicator />
          <BarIndicator disabled />
          <BarIndicator disabled />
        </div>
      );
    case IndicatorIconsState.BAR_STEP_2:
      return (
        <div className="gap-x-7pxr flex items-center justify-center">
          <BarIndicator />
          <BarIndicator />
          <BarIndicator disabled />
        </div>
      );
    case IndicatorIconsState.BAR_STEP_3:
      return (
        <div className="gap-x-7pxr flex items-center justify-center">
          <BarIndicator />
          <BarIndicator />
          <BarIndicator />
        </div>
      );
    case IndicatorIconsState.CIRCLE_ENABLED:
      return (
        <div className="flex items-center justify-center">
          <div className="bg-primary h-11pxr w-11pxr rounded-100pxr" />
        </div>
      );
    case IndicatorIconsState.CIRCLE_DISABLED:
      return (
        <div className="flex items-center justify-center">
          <div className="h-11pxr w-11pxr rounded-100pxr bg-[#E6578733]" />
        </div>
      );
    default:
      return null;
  }
};

export default IndicatorIcons;
