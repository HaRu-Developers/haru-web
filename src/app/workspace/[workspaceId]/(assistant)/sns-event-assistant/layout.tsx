import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'SNS 이벤트 어시스턴트 페이지',
  description: 'HaRu의 두 번째 기능인 SNS 이벤트 어시스턴트 페이지입니다.',
};

const SnsEventAssistantRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default SnsEventAssistantRootLayout;
