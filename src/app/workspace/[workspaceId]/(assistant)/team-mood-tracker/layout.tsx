import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '팀 분위기 트래커 페이지 - HaRu',
  description: 'HaRu의 세 번째 기능인 팀 분위기 트래커의 페이지입니다.',
};

const TeamMoodTrackerRootLayout = async ({
  children,
  teamMoodTrackerGeneralModal,
}: Readonly<{
  children: React.ReactNode;
  teamMoodTrackerGeneralModal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {teamMoodTrackerGeneralModal}
    </>
  );
};

export default TeamMoodTrackerRootLayout;
