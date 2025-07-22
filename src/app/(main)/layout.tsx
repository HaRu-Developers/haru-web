import type { Metadata } from 'next';

import FooterLayout from '@common/components/layouts/FooterLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지',
  description:
    '기능별 CTA 박스, 최근 열람한 파일, 그리고 내 캘린더를 한 눈에 조회할 수 있는 페이지입니다.',
};

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <FooterLayout>{children}</FooterLayout>;
};

export default MainLayout;
