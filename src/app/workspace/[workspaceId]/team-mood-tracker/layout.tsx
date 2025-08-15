import React from 'react';

import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '팀 분위기 트래커 페이지 - HaRu',
  description: 'HaRu의 세 번째 기능인 팀 분위기 트래커의 페이지입니다.',
};

const TeamMoodTrackerRootLayout = async ({
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
    <GnbLeftLayout workspaceId={workspaceId}>
      {children}
      {teamMoodTrackerGeneralModal}
    </GnbLeftLayout>
  );
};

export default TeamMoodTrackerRootLayout;
