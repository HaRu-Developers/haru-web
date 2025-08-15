import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '회의 진행 매니저 페이지',
  description: 'HaRu의 첫 번째 기능인 AI 회의 진행 매니저 페이지입니다.',
};

const AiMeetingManagerRootLayout = async ({
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

export default AiMeetingManagerRootLayout;
