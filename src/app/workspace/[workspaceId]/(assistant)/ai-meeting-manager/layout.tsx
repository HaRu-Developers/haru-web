import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'AI 회의 진행 매니저_디폴트 페이지 - HaRu',
  description: 'HaRu의 첫 번째 기능인 AI 회의 진행 매니저의 기본 페이지입니다',
};

const AiMeetingManagerRootLayout = async ({
  children,
  aiMeetingManagerModal,
  params,
}: Readonly<{
  children: React.ReactNode;
  aiMeetingManagerModal: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <>
      {/*<GnbLeftLayout workspaceId={workspaceId}>*/}
      {children}
      {aiMeetingManagerModal}
      {/*</GnbLeftLayout>*/}
    </>
  );
};

export default AiMeetingManagerRootLayout;
