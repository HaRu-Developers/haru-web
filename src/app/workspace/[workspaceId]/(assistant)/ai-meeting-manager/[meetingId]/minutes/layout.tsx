import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 회의 진행 매니저_파일 조회 페이지 - HaRu',
  description: 'HaRu의 첫 번째 기능인 AI 회의 진행 매니저의 과거 파일 조회 페이지입니다',
};

const AiMeetingMinutesLayout = ({
  children,
  aiMeetingManagerMinutesModal,
}: Readonly<{
  children: React.ReactNode;
  aiMeetingManagerMinutesModal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {aiMeetingManagerMinutesModal}
      <div id="cannot-page-scroll" />
    </>
  );
};

export default AiMeetingMinutesLayout;
