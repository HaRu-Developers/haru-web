import LandingStart from '@features/landing/components/LandingStart/LandingStart.client';
import LandingTop from '@features/landing/components/LandingTop/LandingTop.client';
import LandingBanner from '@features/landing/components/landing-banner/LandingBanner/LandingBanner.client';
import LandingIntroduction from '@features/landing/components/landing-introduction/LandingIntroduction.server';
import LandingNecessity from '@features/landing/components/landing-necessity/LandingNecessity/LandingNecessity.server';
import LandingTeam from '@features/landing/components/landing-team/LandingTeam/LandingTeam.server';

const LandingPage = () => {
  return (
    <>
      <LandingTop />
      <LandingBanner />
      {/* Landing feature */}
      <LandingIntroduction />
      <LandingNecessity />
      <LandingTeam />
      <LandingStart />
    </>
  );
};

export default LandingPage;
