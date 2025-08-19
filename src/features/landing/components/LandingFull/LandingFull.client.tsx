'use client';

import { useRouter } from 'next/navigation';

import LandingStart from '../LandingStart/LandingStart.client';
import LandingTop from '../LandingTop/LandingTop.client';
import LandingBanner from '../landing-banner/LandingBanner/LandingBanner.client';
import LandingFeature from '../landing-feature/LandingFeature/LandingFeature.client';
import LandingIntroduction from '../landing-introduction/LandingIntroductuion/LandingIntroduction.client';
import LandingNecessity from '../landing-necessity/LandingNecessity/LandingNecessity.client';
import LandingTeam from '../landing-team/LandingTeam/LandingTeam.client';

/**
 * LandingFull 컴포넌트는 전체 랜딩 페이지를 구성하는 컴포넌트입니다.
 */
const LandingFull = () => {
  const className = 'px-120pxr';
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/auth/login');
  };
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      <LandingTop
        className={className}
        onButtonClick={handleLoginClick}
        onLogoClick={handleLogoClick}
      />
      <LandingBanner className={className} />
      <LandingFeature className={className} onClick={handleLoginClick} />
      <LandingIntroduction className={className} />
      <LandingNecessity className={className} />
      <LandingTeam className={className} />
      <LandingStart className={className} onButtonClick={handleLoginClick} />
    </>
  );
};

export default LandingFull;
