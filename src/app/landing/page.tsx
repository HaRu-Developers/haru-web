import LandingStart from '@features/landing/components/LandingStart/LandingStart.client';
import LandingTop from '@features/landing/components/LandingTop/LandingTop.client';
import LandingBanner from '@features/landing/components/landing-banner/LandingBanner/LandingBanner.client';
import LandingFeature from '@features/landing/components/landing-feature/LandingFeature/LandingFeature.client';
import LandingIntroduction from '@features/landing/components/landing-introduction/LandingIntroductuion/LandingIntroduction.server';
import LandingNecessity from '@features/landing/components/landing-necessity/LandingNecessity/LandingNecessity.server';
import LandingTeam from '@features/landing/components/landing-team/LandingTeam/LandingTeam.server';

const LandingPage = () => {
  const className = 'px-120pxr';
  return (
    <>
      <LandingTop className={className} />
      <LandingBanner className={className} />
      <LandingFeature className={className} />
      <LandingIntroduction className={className} />
      <LandingNecessity className={className} />
      <LandingTeam className={className} />
      <LandingStart className={className} />
    </>
  );
};

export default LandingPage;
