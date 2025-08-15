import FooterLayout from '@common/components/layouts/FooterLayout.server';

import LandingFull from '@features/landing/components/LandingFull/LandingFull.client';

const RootPage = () => {
  return (
    <FooterLayout>
      <LandingFull />
    </FooterLayout>
  );
};

export default RootPage;
