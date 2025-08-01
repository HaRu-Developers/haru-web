import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '워크 스페이스와 연관된 페이지',
  description: '특정 워크 스페이스에 종속된 페이지입니다.',
};

const WorkSpaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default WorkSpaceLayout;
