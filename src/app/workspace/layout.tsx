import type { Metadata } from 'next';

import FooterLayout from '@common/components/layouts/FooterLayout.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지 - HaRu',
  description: '하루의 메인페이지입니다.',
};

const MainLayout = async ({
  children,
  workspaceModal,
  params,
}: Readonly<{
  children: React.ReactNode;
  workspaceModal: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <>
      {/*<GnbLeftLayout workspaceId={workspaceId}>*/}
      {children}
      {/*</GnbLeftLayout>*/}
      {workspaceModal}
    </>
  );
};

export default MainLayout;
