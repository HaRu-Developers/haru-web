import type { Metadata } from 'next';

import Footer from '@common/components/layouts/Footer/Footer.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'WorkSpace_메인_페이지',
  description: 'HaRu의 워크스페이스 메인페이지입니다.',
};

const WorkSpaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <GnbLeftLayout>{children}</GnbLeftLayout>
      <Footer />
    </div>
  );
};

export default WorkSpaceLayout;
