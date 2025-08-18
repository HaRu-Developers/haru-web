import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SNS 이벤트 어시스턴트 페이지 - HaRu',
  description: 'HaRu의 두 번째 기능인 SNS 이벤트 어시스턴트 페이지입니다.',
};

const SnsEventAssistantRootLayout = async ({
  children,
  snsEventAssistantGeneralModal,
}: Readonly<{
  children: React.ReactNode;
  snsEventAssistantGeneralModal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {snsEventAssistantGeneralModal}
    </>
  );
};

export default SnsEventAssistantRootLayout;
