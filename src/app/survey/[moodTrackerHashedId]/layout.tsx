import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '설문 응답 - HaRu',
  description: '설문에 응답하는 페이지입니다.',
};

const PublicSurveyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PublicSurveyPageLayout;
