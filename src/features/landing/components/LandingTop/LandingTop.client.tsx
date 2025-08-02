import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import CtaSignButton from '../buttons/cta-buttons/CtaSignButton/CtaSignButton.client';
import { LandingTopProps } from './LandingTop.types';

const LandingTop = ({ onLogoClick, onButtonClick }: LandingTopProps) => {
  return (
    <div className="px-120pxr py-23pxr h-84pxr bg-landing-bg flex w-full shrink-0 items-center justify-between">
      <div onClick={onLogoClick}>
        <HaruLogoIcons state={HaruLogoIconsState.MIXED} className="w-116pxr h-28pxr" />
      </div>
      <CtaSignButton onClick={onButtonClick} />
    </div>
  );
};

export default LandingTop;
