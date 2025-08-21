import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - HaRu',
  description: 'HaRu 로그인 페이지입니다.',
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
