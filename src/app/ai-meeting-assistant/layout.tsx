import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'AI 회의 진행 매니저',
  description: '회의 내용을 자동으로 기록하고 AI가 질문을 추천해주는 스마트 회의 도우미입니다.',
};

const AiMeetingAssistantLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default AiMeetingAssistantLayout;
