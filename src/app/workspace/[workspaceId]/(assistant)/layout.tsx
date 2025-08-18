import type { Metadata } from 'next';

import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: '메인 페이지 - HaRu',
  description:
    '기능별 CTA 박스, 최근 열람한 파일, 그리고 내 캘린더를 한 눈에 조회할 수 있는 페이지입니다.',
};

/**
 *
 * inner workspace id의 main을 제외하면 모두 GnbLeftLayout이 포함되므로 layout에 넣음
 */
const AssistantLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}>) => {
  const { workspaceId } = await params;

  return <GnbLeftLayout workspaceId={workspaceId}>{children}</GnbLeftLayout>;
};

export default AssistantLayout;
