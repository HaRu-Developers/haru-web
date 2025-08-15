'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import {
  useTeamMoodToastActions,
  useTeamMoodToastInfo,
} from '@features/team-mood-tracker/hooks/stores/useTeamMoodTrackerToastStore';

import { TeamMoodTrackerToastLabels } from './TeamMoodToast.constants';

const TeamMoodToast = () => {
  const { copyToast } = useTeamMoodToastInfo();
  const { hideCopyToast } = useTeamMoodToastActions();
  const [isShowing, setIsShowing] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (!copyToast) return;

    // 상태 초기화 로직 추가
    setIsShowing(true);
    setIsHiding(false);

    const enterTimer = setTimeout(() => setIsShowing(false), 50);
    const removeTimer = setTimeout(() => setIsHiding(true), 2000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(removeTimer);
    };
  }, [copyToast]);

  useEffect(() => {
    if (isHiding) {
      const timeout = setTimeout(() => hideCopyToast(), 500);
      return () => clearTimeout(timeout);
    }
  }, [isHiding, hideCopyToast]);

  if (!copyToast) return null;

  const handleClick = () => {
    setIsHiding(true);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      onClick={handleClick}
      className={clsx(
        'border-stroke-200 px-24pxr py-12pxr shadow-audio-bar h-50pxr w-300pxr text-primary flex cursor-pointer items-center justify-center overflow-hidden rounded border-solid bg-gray-700 text-center text-ellipsis whitespace-nowrap transition-all duration-500 ease-in-out',
        {
          'opacity-100': !isShowing && !isHiding,
          'pointer-events-none opacity-0': isShowing || isHiding,
        },
      )}
    >
      {TeamMoodTrackerToastLabels[copyToast.type]}
    </div>
  );
};

export default TeamMoodToast;
