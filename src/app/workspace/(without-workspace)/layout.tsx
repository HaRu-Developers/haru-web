import type { Metadata } from 'next';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import FooterLayout from '@common/components/layouts/FooterLayout.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지_소속된 워크스페이스 존재하지 않음',
  description:
    '로그인은 완료하였으나 소속된 워크스페이스가 존재하지 않는 사용자에게 노출되는 메인 페이지입니다.',
};

const MainWithoutWorkspaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <FooterLayout>
      <GnbLeftLayout>
        <GnbTop section={GnbSection.MAIN} />
        {children}
      </GnbLeftLayout>
    </FooterLayout>
  );
};

export default MainWithoutWorkspaceLayout;
