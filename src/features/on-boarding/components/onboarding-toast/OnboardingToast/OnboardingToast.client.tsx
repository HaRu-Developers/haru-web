'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { OnboardingToastType } from '@features/on-boarding/types/OnboardingToast.types';

import { useOnboardingToastActions } from '@features/on-boarding/hooks/stores/useOnboardingToastStore';

import { OnboardingToastLabels } from './OnboardingToast.constants';
import { OnboardingToastProps } from './OnboardingToast.types';

const OnboardingToast = ({ onboardingToast }: OnboardingToastProps) => {
  const { type, snsAccount } = onboardingToast;
  const [isShowing, setIsShowing] = useState(true); // 등장
  const [isHiding, setIsHiding] = useState(false); // 사라짐
  const { hideOnboardingToast } = useOnboardingToastActions();

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsShowing(false), 50);
    const removeTimer = setTimeout(() => setIsHiding(true), 2000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    if (isHiding) {
      const timeout = setTimeout(() => hideOnboardingToast(), 500); // transition 시간과 맞춤

      return () => clearTimeout(timeout);
    }
  }, [isHiding]);

  const handleClick = () => {
    setIsHiding(true);
  };

  const content =
    type === OnboardingToastType.SUCCESS_INVITE
      ? OnboardingToastLabels.SUCCESS_INVITE
      : OnboardingToastLabels.SUCCESS_SNS_ACCOUNT(snsAccount ?? '');

  return (
    <div
      role="alert"
      aria-live="assertive"
      onClick={handleClick}
      className={clsx(
        'border-stroke-200 px-24pxr py-12pxr shadow-audio-bar h-50pxr w-300pxr text-secondary-green flex cursor-pointer items-center justify-center overflow-hidden rounded border-solid bg-gray-700 text-center text-ellipsis whitespace-nowrap transition-all duration-500 ease-in-out',
        {
          'opacity-100': !isShowing && !isHiding,
          'pointer-events-none opacity-0': isShowing || isHiding,
        },
      )}
    >
      {content}
    </div>
  );
};

export default OnboardingToast;
