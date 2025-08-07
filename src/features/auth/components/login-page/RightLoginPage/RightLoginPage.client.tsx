'use client';

import { useState } from 'react';

import Link from 'next/link';

import GoogleLoginButton from '@common/components/buttons/48px/GoogleLoginButton/GoogleLoginButton.client';
import LoginButton from '@common/components/buttons/48px/LoginButton/LoginButton.client';
import InputOnboarding from '@common/components/inputs/InputOnboarding/InputOnboarding.client';
import { OnboardingType } from '@common/components/inputs/InputOnboarding/InputOnboarding.types';

import { useLogin } from '@apis/user/apis/hooks/mutations/useLogin';

const RightLoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const [loginAvailable, setLoginAvailable] = useState<boolean>(false);

  const loginMutation = useLogin();

  const handleLogin = () => {
    if (email && password) {
      loginMutation.mutate({ email, password });
    } else {
      console.error('Complete the form before logging in.');
    }
  };

  return (
    <div className="w-414pxr flex h-full flex-col items-center justify-center">
      {/* 하루에 오신 것을 환영해요 어쩌구! */}
      <div className="flex w-full flex-col items-start">
        {/* 이모티콘 사이즈는 text size를 따라감 */}
        <span className="w-36pxr h-36pxr text-36pxr flex items-center justify-center">👋</span>
        <span className="text-login-register-page-greetings mr-10pxr text-black">
          HaRu에 오신 것을 환영해요!
        </span>
        {/* TODO: 타이포그래피 임의 적용되었음 */}
        <span className="text-b1-rg mr-6pxr text-gray-200">HaRu와 함께 하루를 시작해 볼까요?</span>
      </div>
      {/* OAuth 버튼 */}
      <GoogleLoginButton className="mt-50pxr" buttonText="Google로 로그인하기" />
      {/* -- 또는 -- */}
      <div className="my-24pxr gap-x-10pxr flex w-full flex-row items-center">
        <div className="bg-stroke-200 h-px flex-grow" />
        <span className="mx-10pxr text-cap2-rg text-gray-300">또는</span>
        <div className="bg-stroke-200 h-px flex-grow" />
      </div>
      {/* 이메일 & 비밀번호 폼 */}
      <form className="gap-y-26pxr flex flex-col" onSubmit={handleLogin}>
        <InputOnboarding
          title="이매일 주소"
          inputValue={email}
          placeholder="이메일 주소를 입력해주세요"
          onChange={setEmail}
        />
        <InputOnboarding
          title="비밀번호"
          inputValue={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          type={OnboardingType.HIDE}
        />
        <LoginButton className="mt-22pxr" disabled={!(email && password)} type="submit" />
      </form>
      {/* 로그인하기 버튼 */}
      {/* 가입하기 버튼 */}
      <div className="mt-44pxr flex w-full items-center justify-center">
        <span className="text-b4-rg text-gray-200">계정이 없으신가요?</span>
        <Link href="/auth/register" className="text-t7-sb ml-2 cursor-pointer text-black underline">
          가입하기
        </Link>
      </div>
    </div>
  );
};

export default RightLoginPage;
