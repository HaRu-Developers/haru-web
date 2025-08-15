import React from 'react';

import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'SNS 이벤트 어시스턴트 페이지 - HaRu',
  description: 'HaRu의 두 번째 기능인 SNS 이벤트 어시스턴트 페이지입니다.',
};

const SnsEventAssistantRootLayout = async ({
  children,
  snsEventAssistantGeneralModal,
  params,
}: Readonly<{
  children: React.ReactNode;
  snsEventAssistantGeneralModal: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}>) => {
  const workspaceId = (await params).workspaceId;

  return (
    <GnbLeftLayout workspaceId={workspaceId}>
      {children}
      {snsEventAssistantGeneralModal}
    </GnbLeftLayout>
  );
};

export default SnsEventAssistantRootLayout;
