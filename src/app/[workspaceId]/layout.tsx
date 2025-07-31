import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지',
  description:
    '기능별 CTA 박스, 최근 열람한 파일, 그리고 내 캘린더를 한 눈에 조회할 수 있는 페이지입니다.',
};

const WorkSpaceMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default WorkSpaceMainLayout;
