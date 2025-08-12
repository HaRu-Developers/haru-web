import type { Metadata } from 'next';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '내 캘린더 페이지_소속된 워크스페이스 존재하지 않음',
  description:
    '로그인은 완료하였으나 소속된 워크스페이스가 존재하지 않는 사용자에게 노출되는 내 캘린더 페이지입니다.',
};

const CalendarWithoutWorkspaceLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GnbLeftLayout>
      <GnbTop section={GnbSection.CALENDAR} />
      {children}
    </GnbLeftLayout>
  );
};

export default CalendarWithoutWorkspaceLayout;
