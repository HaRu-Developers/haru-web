import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '팀 분위기 트래커 디테일 페이지 - HaRu',
  description: 'HaRu의 세 번째 기능인 팀 분위기 트래커의 디테일 페이지입니다.',
};

const TeamMoodTrackerDetailLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default TeamMoodTrackerDetailLayout;
