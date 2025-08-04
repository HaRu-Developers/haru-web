import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WorkSpace_메인_페이지',
  description: 'HaRu의 워크스페이스 메인페이지입니다.',
};

const WorkspaceIdLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default WorkspaceIdLayout;
