import type { Metadata } from 'next';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import FooterLayout from '@common/components/layouts/FooterLayout.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지_소속된 워크스페이스 존재하지 않음',
  description:
    '로그인은 완료하였으나 소속된 워크스페이스가 존재하지 않는 사용자에게 노출되는 메인 페이지입니다.',
};

const MainWithoutWorkspaceLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <FooterLayout>
      <GnbLeftLayout workspaceId={workspaceId}>
        <GnbTop section={GnbSection.MAIN} />
        {children}
      </GnbLeftLayout>
    </FooterLayout>
  );
};

export default MainWithoutWorkspaceLayout;
