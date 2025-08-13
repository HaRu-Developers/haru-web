import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 회의 진행 매니저_회의 진행 페이지 - HaRu',
  description: 'HaRu의 첫 번째 기능인 AI 회의 진행 매니저의 회의 진행 페이지입니다.',
};

const AiMeetingProceedingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default AiMeetingProceedingLayout;
