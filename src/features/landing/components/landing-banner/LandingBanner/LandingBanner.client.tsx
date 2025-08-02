'use client';

import React, { useState } from 'react';

import FeatureButton from '../../buttons/FeatureButton/FeatureButton.client';
import { FeatureButtonType } from '../../buttons/FeatureButton/FeatureButton.types';
import Banner from '../Banner/Banner.server';
import TitleDisplay from '../TitleDisplay/TitleDisplay.server';

const LandingBanner = () => {
  const [state, setState] = useState<FeatureButtonType>(FeatureButtonType.MEETING);

  return (
    <div className="gap-68pxr bg-landing-bg py-68pxr flex w-full flex-col items-center justify-center">
      {/* 배너 타이틀 영역 */}
      <TitleDisplay />
      {/* 배너 전체 영역 */}
      <div className="h-615pxr bg-primary-selected rounded-20pxr w-1200pxr flex flex-col items-center justify-center overflow-hidden">
        {/* 기능 버튼 */}
        <div className="mt-60pxr mb-61pxr gap-x-8pxr flex">
          <FeatureButton
            name="AI Metetings"
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
