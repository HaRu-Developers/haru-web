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
    <>
      <GnbLeftLayout workspaceId={workspaceId}>
        <FooterLayout>
          <GnbTop section={GnbSection.MAIN} />
          <MainPageSection />;
        </FooterLayout>
      </GnbLeftLayout>
    </>
  );
};

export default MainPage;
