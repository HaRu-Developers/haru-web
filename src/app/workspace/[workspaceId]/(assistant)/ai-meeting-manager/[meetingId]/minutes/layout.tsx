import type { Metadata } from 'next';

import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';

export const metadata: Metadata = {
  title: 'AI 회의 진행 매니저_파일 조회 페이지',
  description: 'HaRu의 첫 번째 기능인 AI 회의 진행 매니저의 과거 파일 조회 페이지입니다',
};

const AiMeetingMinutesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MeetingHeader />
      {children}
    </>
  );
};

export default AiMeetingMinutesLayout;
