import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'SNS 이벤트 어시스턴트 페이지_소속된 워크스페이스 존재하지 않음',
  description:
    '로그인은 완료하였으나 소속된 워크스페이스가 존재하지 않는 사용자에게 노출되는 SNS 이벤트 어시스턴트 페이지입니다.',
};

const SnsEventAssistantWithoutWorkspaceLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GnbLeftLayout>{children}</GnbLeftLayout>;
};

export default SnsEventAssistantWithoutWorkspaceLayout;
