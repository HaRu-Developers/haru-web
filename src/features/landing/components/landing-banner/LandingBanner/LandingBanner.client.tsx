'use client';

import React, { useState } from 'react';

import clsx from 'clsx';

import FeatureButton from '../../buttons/FeatureButton/FeatureButton.client';
import { FeatureButtonType } from '../../buttons/FeatureButton/FeatureButton.types';
import Banner from '../Banner/Banner.server';
import TitleDisplay from '../TitleDisplay/TitleDisplay.client';
import { LandingBannerProps } from './LandingBanner.types';

const LandingBanner = ({ className }: LandingBannerProps) => {
  const [state, setState] = useState<FeatureButtonType>(FeatureButtonType.MEETING);

  return (
    <div
      className={clsx(
        'gap-68pxr bg-landing-bg pt-68pxr pb-30pxr flex w-full flex-col items-center justify-center',
        className,
      )}
    >
      {/* 배너 타이틀 영역 */}
      <TitleDisplay />
      {/* 배너 전체 영역 */}
      <div className="h-615pxr bg-primary-selected rounded-20pxr w-1200pxr animate-fade-in-up-and-delay flex flex-col items-center justify-center overflow-hidden opacity-0">
        {/* 기능 버튼 */}
        <div className="mt-60pxr mb-61pxr gap-x-8pxr flex">
          <FeatureButton
            name="AI Meetings"
            iconType={FeatureButtonType.MEETING}
            disabled={state === FeatureButtonType.MEETING}
            onButtonClick={setState}
          />
          <FeatureButton
            name="Events"
            iconType={FeatureButtonType.EVENT}
            disabled={state === FeatureButtonType.EVENT}
            onButtonClick={setState}
          />
          <FeatureButton
            name="Mood Tracker"
            iconType={FeatureButtonType.MOODTRACKER}
            disabled={state === FeatureButtonType.MOODTRACKER}
            onButtonClick={setState}
          />
          <FeatureButton
            name="Calendar"
            iconType={FeatureButtonType.CALENDAR}
            disabled={state === FeatureButtonType.CALENDAR}
            onButtonClick={setState}
          />
        </div>
        {/* 배너 */}
        <Banner state={state} />
      </div>
    </div>
  );
};

export default LandingBanner;
