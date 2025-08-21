import { Suspense } from 'react';

import LoginOnBoarding from '@common/components/onboarding/LoginOnBoaring/LoginOnBoarding.client';

import GoogleLoginButton from '@buttons/48px/GoogleLoginButton/GoogleLoginButton.client';

import DdoneunDivider from '@features/auth/components/DdoneunDivider/DdoneunDivider.server';
import HaveNoAccount from '@features/auth/components/login-page/HaveNoAccount/HaveNoAccount.server';
import LoginForm from '@features/auth/components/login-page/LoginForm/LoginForm.client';
import LoginGreetingText from '@features/auth/components/login-page/LoginGreetingText/LoginGreetingText.server';

const LoginPage = () => {
  return (
    <div className="flex w-full flex-row">
      <LoginOnBoarding />
      <div className="flex w-[50vw] items-center justify-center">
        <div className="w-414pxr flex h-full flex-col items-center justify-center">
          {/* 하루에 오신 것을 환영해요 어쩌구! */}
          <LoginGreetingText />
          {/* OAuth 버튼 */}
          <GoogleLoginButton className="mt-50pxr" buttonText="Google로 로그인하기" />
          {/* -- 또는 -- */}
          <DdoneunDivider className="mt-24pxr" />
          {/* 이메일 & 비밀번호 폼 */}
          {/* 추후 fallback은 스켈레톤으로 대체 해도 됨 */}
          <Suspense fallback={<div>로딩중...</div>}>
            <LoginForm />
          </Suspense>
          {/* 가입하기 버튼 */}
          <HaveNoAccount />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
