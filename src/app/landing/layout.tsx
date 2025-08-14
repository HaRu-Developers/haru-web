import type { Metadata } from 'next';

import FooterLayout from '@common/components/layouts/FooterLayout.server';

export const metadata: Metadata = {
  title: '랜딩 페이지 - HaRu',
  description: 'HaRu의 랜딩 페이지입니다.',
};

const LandingLayout = ({
  children,
  landingModal,
}: Readonly<{
  children: React.ReactNode;
  landingModal: React.ReactNode;
}>) => {
  return (
    <FooterLayout>
      {children}
      {landingModal}
    </FooterLayout>
  );
};

export default LandingLayout;
