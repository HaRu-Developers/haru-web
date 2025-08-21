import type { Metadata } from 'next';

import ProtectChildren from '@features/auth/components/protect-routes/ProtectChildren/ProtectChildren.client';

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
    <ProtectChildren protectMode={true}>
      <>
        {children}
        {workspaceModal}
      </>
    </ProtectChildren>
  );
};

export default MainLayout;
