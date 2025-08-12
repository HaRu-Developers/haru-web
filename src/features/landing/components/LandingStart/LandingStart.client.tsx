'use client';

import clsx from 'clsx';

import CtaBannerButton from '@features/landing/components/buttons/cta-buttons/CtaBannerButton/CtaBannerButton.client';

import { LandingStartProps } from './LandingStart.types';

const LandingStart = ({ onButtonClick, className }: LandingStartProps) => {
  return (
    <div
      className={clsx(
        'py-92pxr gap-42pxr bg-landing-bg flex w-full flex-col items-center justify-center',
        className,
      )}
    >
      {/* 배너 타이틀 영역 */}
      <div className="text-h2-bd flex flex-col items-center">
        <div>
          <span className="text-black">지금 바로 </span>
          <span className="text-primary">HaRu</span>
          <span className="text-black">와</span>
        </div>
        <span className="text-black">하루를 시작해 보세요!</span>
      </div>
      {/* 배너 버튼 */}
      <CtaBannerButton onClick={onButtonClick} />
    </div>
  );
};

export default LandingStart;
