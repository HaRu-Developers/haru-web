import type { Metadata } from 'next';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

export const metadata: Metadata = {
  title: '내 캘린더 페이지 - HaRu',
  description: '일자별로 생성된 파일을 캘린더 뷰로 한눈에 조회할 수 있는 페이지입니다.',
};

const CalendarLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <GnbTop section={GnbSection.CALENDAR} />
      {children}
    </>
  );
};

export default CalendarLayout;
