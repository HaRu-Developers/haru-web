import { GnbSection } from '@common/types/gnbs.types';

import MainPageSection from '@common/components/MainPageSection/MainPageSection.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import FooterLayout from '@common/components/layouts/FooterLayout.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

const MainPage = async ({
  params,
}: Readonly<{
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <FooterLayout>
      <GnbLeftLayout workspaceId={workspaceId}>
        <GnbTop section={GnbSection.MAIN} />
        <MainPageSection />;
      </GnbLeftLayout>
    </FooterLayout>
  );
};

export default MainPage;
