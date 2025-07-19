import type { Metadata } from 'next';

import FooterLayout from '@common/components/layouts/FooterLayout.server';

export const metadata: Metadata = {
  title: '메인',
  description: '메인 설명',
};

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <FooterLayout>{children}</FooterLayout>;
};

export default MainLayout;
