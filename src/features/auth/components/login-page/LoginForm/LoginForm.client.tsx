'use client';

import { useState } from 'react';

import { useLogin } from '@api/user/hooks/mutations/useLogin';

import LoginButton from '@common/components/buttons/48px/LoginButton/LoginButton.client';
import InputOnboarding from '@common/components/inputs/InputOnboarding/InputOnboarding.client';
import { OnboardingType } from '@common/components/inputs/InputOnboarding/InputOnboarding.types';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      console.log('로그인 시도:', { email, password });
      loginMutation.mutate({ email, password });
    } else {
      console.error('Complete the form before logging in.');
    }
  };

  return (
    <>
      {/* 오류 표시 영역 */}
      <div className="h-34pxr text-system-red text-cap1-rg flex items-center justify-center">
        {loginMutation.isError && '이메일 또는 비밀번호가 올바르지 않습니다.'}
      </div>
      <form className="gap-y-26pxr flex flex-col" onSubmit={handleLogin}>
        <InputOnboarding
          title="이메일 주소"
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
        {/* 로그인하기 버튼 */}
        <LoginButton className="mt-22pxr" disabled={!(email && password)} type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
