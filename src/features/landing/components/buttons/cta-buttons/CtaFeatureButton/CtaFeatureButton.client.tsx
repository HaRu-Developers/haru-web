'use client';

import clsx from 'clsx';

import LandingArrowIcons from '@icons/LandingArrowIcons/LandingArrowIcons';
import { LandingArrowIconsState } from '@icons/LandingArrowIcons/LandingArrowIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * CTA 기능 버튼 컴포넌트
 */
const CtaFeatureButton = ({ name, className, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'rounded-7pxr h-38pxr gap-3pxr py-6pxr pl-14pxr pr-12pxr inline-flex w-fit shrink-0 items-center justify-center bg-gray-100',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className="text-bt2-sb text-white">{name}</span>
      <LandingArrowIcons state={LandingArrowIconsState.UP_RIGHT_ARROW} />
    </button>
  );
};

export default CtaFeatureButton;
