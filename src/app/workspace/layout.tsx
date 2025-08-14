import type { Metadata } from 'next';

import FooterLayout from '@common/components/layouts/FooterLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지 - HaRu',
  description: '하루의 메인페이지입니다.',
};

const MainLayout = async ({
  children,
  workspaceModal,
}: Readonly<{
  children: React.ReactNode;
  workspaceModal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {workspaceModal}
    </>
  );
};

export default MainLayout;
