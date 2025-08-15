import Footer from '@common/components/layouts/Footer/Footer.server';
import LandingFull from '@features/landing/components/LandingFull/LandingFull.client';

const RootPage = () => {
  
  return (
    <>
      <LandingFull />
      <Footer />
    </>
  );
};

export default RootPage;
