'use client';

import clsx from 'clsx';

import LandingArrowIcons from '@icons/LandingArrowIcons/LandingArrowIcons';
import { LandingArrowIconsState } from '@icons/LandingArrowIcons/LandingArrowIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * CTA 배너 버튼 컴포넌트
 */
const CtaBannerButton = ({ className, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'rounded-9pxr h-48pxr w-214pxr gap-6pxr py-16pxr pl-44pxr pr-36pxr bg-primary inline-flex shrink-0 items-center justify-center',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className="text-bt1-sb whitespace-nowrap text-white">지금 바로 시작하기</span>
      <LandingArrowIcons state={LandingArrowIconsState.RIGHT_ARROW} />
    </button>
  );
};

export default CtaBannerButton;
