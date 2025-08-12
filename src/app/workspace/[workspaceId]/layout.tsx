import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '워크 스페이스와 연관된 페이지',
  description: '특정 워크 스페이스에 종속된 페이지입니다.',
};

const WorkSpaceLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { workspaceId?: string };
}>) => {
  const workspaceId = (await params).workspaceId;

  if (Number.isNaN(Number(workspaceId))) {
    // 문자열 → 숫자 변환 후 검사
    notFound();
  }
  return <>{children}</>;
};

export default WorkSpaceLayout;
