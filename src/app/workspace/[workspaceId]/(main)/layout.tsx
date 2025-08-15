import React from 'react';

import type { Metadata } from 'next';

import FooterLayout from '@common/components/layouts/FooterLayout.server';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지 - HaRu',
  description:
    '기능별 CTA 박스, 최근 열람한 파일, 그리고 내 캘린더를 한 눈에 조회할 수 있는 페이지입니다.',
};

const MainWithWorkspaceLayout = async ({
  children,
  teamMoodTrackerGeneralModal,
  params,
}: Readonly<{
  children: React.ReactNode;
  teamMoodTrackerGeneralModal: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <FooterLayout>
      <GnbLeftLayout workspaceId={workspaceId}>{children}</GnbLeftLayout>
      {teamMoodTrackerGeneralModal}
    </FooterLayout>
  );
};

export default MainWithWorkspaceLayout;
