import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import { GnbSection } from '@common/types/gnbs.types';

export const metadata: Metadata = {
  title: '내 캘린더_디폴트 페이지',
  description: 'HaRu의 네 번째 기능인 내 캘린더의 기본 페이지입니다.',
};

const CalendarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (<GnbLeftLayout>
    <GnbTop section={GnbSection.CALENDAR} />
    {children}
  </GnbLeftLayout>);
};

export default CalendarLayout;
