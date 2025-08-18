import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '팀 분위기 트래커 생성 - HaRu',
  description: '팀 분위기 트래커를 생성하는 페이지입니다.',
};

const CreateSurveyLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default CreateSurveyLayout;
