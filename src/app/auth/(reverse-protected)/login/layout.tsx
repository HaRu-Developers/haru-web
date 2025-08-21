import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - HaRu',
  description: 'HaRu 회원가입 페이지입니다.',
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
