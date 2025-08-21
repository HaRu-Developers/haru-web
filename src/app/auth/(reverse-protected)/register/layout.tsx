import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - HaRu',
  description: 'HaRu 회원가입 페이지입니다.',
};

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen flex-col items-center justify-center">{children}</div>;
};

export default RegisterLayout;
