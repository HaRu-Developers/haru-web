import type { Metadata } from 'next';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '내 캘린더 페이지 - HaRu',
  description: '일자별로 생성된 파일을 캘린더 뷰로 한눈에 조회할 수 있는 페이지입니다.',
};

const CalendarLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <GnbLeftLayout workspaceId={workspaceId}>
      <GnbTop section={GnbSection.CALENDAR} />
      {children}
    </GnbLeftLayout>
  );
};

export default CalendarLayout;
