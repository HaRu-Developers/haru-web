'use client';

import clsx from 'clsx';

import LandingFeatureIcons from '@icons/LandingFeatureIcons/LandingFeatureIcons';
import { LandingFeatureIconsState } from '@icons/LandingFeatureIcons/LandingFeatureIcons.types';

import { FeatureButtonProps, FeatureButtonType } from './FeatureButton.types';

/**
 * 기능 버튼 컴포넌트
 */
const FeatureButton = ({
  name,
  iconType,
  className,
  onButtonClick,
  onClick,
  disabled,
  ...props
}: FeatureButtonProps) => {
  const handleClick = () => {
    onButtonClick?.(iconType);
  };

  const iconStateMap = {
    [FeatureButtonType.CALENDAR]: {
      enabled: LandingFeatureIconsState.SIZE_24_CALENDAR,
      disabled: LandingFeatureIconsState.SIZE_24_CALENDAR_WHITE,
    },
    [FeatureButtonType.EVENT]: {
      enabled: LandingFeatureIconsState.SIZE_24_EVENT,
      disabled: LandingFeatureIconsState.SIZE_24_EVENT_WHITE,
    },
    [FeatureButtonType.MEETING]: {
      enabled: LandingFeatureIconsState.SIZE_24_MEETING,
      disabled: LandingFeatureIconsState.SIZE_24_MEETING_WHITE,
    },
    [FeatureButtonType.MOODTRACKER]: {
      enabled: LandingFeatureIconsState.SIZE_24_MOODTRACKER,
      disabled: LandingFeatureIconsState.SIZE_24_MOODTRACKER_WHITE,
    },
  };

  const iconState = disabled ? iconStateMap[iconType].disabled : iconStateMap[iconType].enabled;

  return (
    <button
      className={clsx(
        'rounded-5pxr py-4pxr pl-7pxr pr-12pxr border-stroke-200 gap-2pxr inline-flex items-center border',
        {
          'cursor-default border-gray-100 bg-gray-100 text-white': disabled,
          'bg-white hover:bg-gray-600': !disabled,
        },
        className,
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <LandingFeatureIcons state={iconState} />
      <span className="text-bt1-sb">{name}</span>
    </button>
  );
};

export default FeatureButton;
