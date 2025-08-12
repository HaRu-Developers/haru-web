import type { Metadata } from 'next';

import QueryClientProviders from '../query-client-providers';

export const metadata: Metadata = {
  title: '온보딩 워크스페이스 생성하기 페이지',
  description:
    '워크스페이스를 생성하기 위한 온보딩 과정입니다. 워크스페이스 명 설정, 워크스페이스의 대표 사진 등록, 초대할 팀원의 이메일 주소 입력, 인스타그램 계정 연동이 포함됩니다.',
};

const OnboardingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main>{children}</main>;
};

export default OnboardingLayout;
