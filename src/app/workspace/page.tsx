import { GnbSection } from '@common/types/gnbs.types';

import MainPageSection from '@common/components/MainPageSection/MainPageSection.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import FooterLayout from '@common/components/layouts/FooterLayout.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

/**
 * 'workspace/layout.tsx'에는 [workspaceId]가 전달되지 않습니다
 * '/workspace', '/workspace/[workspaceId]' 레이아웃에 Footer, GnbLeft를 적용하고
 * 중복을 막기 위해 '/workspace'에선 레이아웃을 페이지에 작성했습니다.
 */
const MainPage = () => {
  return (
    <FooterLayout>
      <GnbLeftLayout>
        <GnbTop section={GnbSection.MAIN} />
        <MainPageSection />
      </GnbLeftLayout>
    </FooterLayout>
  );
};

export default MainPage;
