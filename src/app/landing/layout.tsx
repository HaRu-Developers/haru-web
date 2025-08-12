import type { Metadata } from 'next';

import Footer from '@common/components/layouts/Footer/Footer.server';

export const metadata: Metadata = {
  title: '랜딩 페이지',
  description: 'HaRu의 랜딩 페이지입니다.',
};

const LandingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
