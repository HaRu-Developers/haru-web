import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '회의 진행 매니저 페이지',
  description: 'HaRu의 첫 번째 기능인 AI 회의 진행 매니저 페이지입니다.',
};

const AiMeetingAssistantRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default AiMeetingAssistantRootLayout;
