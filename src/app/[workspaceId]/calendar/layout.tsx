import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '내 캘린더 페이지',
  description: '일자별로 생성된 파일을 캘린더 뷰로 한눈에 조회할 수 있는 페이지입니다.',
};

const CalendarLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default CalendarLayout;
