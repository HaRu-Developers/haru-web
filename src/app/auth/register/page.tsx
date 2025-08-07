'use client';

import { useState } from 'react';

import Link from 'next/link';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import GoogleLoginButton from '@common/components/buttons/48px/GoogleLoginButton/GoogleLoginButton.client';
import RegisterButton from '@common/components/buttons/48px/RegisterButton/RegisterButton.client';
import InputOnboarding from '@common/components/inputs/InputOnboarding/InputOnboarding.client';
import { OnboardingType } from '@common/components/inputs/InputOnboarding/InputOnboarding.types';

import { useRegister } from '@apis/user/hooks/mutations/useRegister';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  interface TermsAgreeState {
    serviceTerms: boolean;
    privacyPolicy: boolean;
    marketingConsent: boolean;
  }

  const [termsAgreeState, setTermsAgreeState] = useState<TermsAgreeState>({
    serviceTerms: false,
    privacyPolicy: false,
    marketingConsent: false,
  });

  const checkboxState = (state: boolean) => {
    return state
      ? CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_ENABLED
      : CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_DISABLED;
  };

  const toggleState = (key: keyof TermsAgreeState) => {
    setTermsAgreeState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = () => {
    const allAgreed = Object.values(termsAgreeState).every(Boolean);
    setTermsAgreeState({
      serviceTerms: !allAgreed,
      privacyPolicy: !allAgreed,
      marketingConsent: !allAgreed,
    });
  };

  const isRegisterAvailable =
    email &&
    name &&
    password &&
    confirmPassword &&
    termsAgreeState.serviceTerms &&
    termsAgreeState.privacyPolicy;

  const { mutate: register } = useRegister();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({
      email,
      name,
      password,
      marketingAgreed: termsAgreeState.marketingConsent,
    });
  };

  return (
    <div className="w-414pxr flex flex-col items-center justify-center">
      {/* 인사말 컨테이너 */}
      <div className="flex flex-col items-center justify-center">
        <span className="w-36pxr h-36pxr text-36pxr flex items-center justify-center">👋</span>
        <span className="text-login-register-page-greetings mt-12pxr">HaRu에 가입하고</span>
        <span className="text-login-register-page-greetings">더 나은 하루를 만나보세요!</span>
      </div>
      {/* 구글 회원가입 버튼 */}
      <GoogleLoginButton className="mt-50pxr" buttonText="Google로 회원가입하기" />
      {/* 또는 */}
      <div className="my-24pxr gap-x-10pxr flex w-full flex-row items-center">
        <div className="bg-stroke-200 h-px flex-grow" />
        <span className="mx-10pxr text-cap2-rg text-gray-300">또는</span>
        <div className="bg-stroke-200 h-px flex-grow" />
      </div>
      {/* 폼 : 이메일, 이름, 비밀번호, 비밀번호 확인 */}
      <form className="gap-y-26pxr flex flex-col" onSubmit={handleRegister}>
        <InputOnboarding
          title="이매일 주소"
          inputValue={email}
          placeholder="이메일 주소를 입력해 주세요"
          onChange={setEmail}
        />
        <InputOnboarding
          title="이름"
          inputValue={name}
          placeholder="이름을 입력해 주세요"
          onChange={setName}
        />
        <InputOnboarding
          title="비밀번호"
          inputValue={password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={setPassword}
          type={OnboardingType.HIDE}
        />
        <InputOnboarding
          title="비밀번호 확인"
          inputValue={confirmPassword}
          placeholder="동일한 비밀번호를 한 번 더 입력해 주세요"
          onChange={setConfirmPassword}
          type={OnboardingType.HIDE}
        />
        {/* 동의 버튼들 - 서비스이용약관, 개인정보처리방침, 마케팅정보수신 동의 (이거만 선택) */}
        <div className="flex flex-col">
          <div className="gap-x-6pxr flex flex-row items-center">
            <button type="button" onClick={toggleAll}>
              <CheckboxIcons
                state={checkboxState(
                  termsAgreeState.marketingConsent &&
                    termsAgreeState.privacyPolicy &&
                    termsAgreeState.serviceTerms,
                )}
              />
            </button>
            <span className="text-cap1-md text-black">전체 동의</span>
          </div>

          <div className="gap-x-6pxr flex flex-row items-center">
            <button type="button" onClick={() => toggleState('serviceTerms')}>
              <CheckboxIcons state={checkboxState(termsAgreeState.serviceTerms)} />
            </button>
            <div>
              <Link href="#" className="text-cap1-md text-audio-bar">
                서비스이용약관
              </Link>
              <span className="text-cap1-md text-black">&nbsp;동의 (필수)</span>
            </div>
          </div>

          <div className="gap-x-6pxr flex flex-row items-center">
            <button type="button" onClick={() => toggleState('privacyPolicy')}>
              <CheckboxIcons state={checkboxState(termsAgreeState.privacyPolicy)} />
            </button>
            <div>
              <Link href="#" className="text-cap1-md text-audio-bar">
                개인정보처리방침{' '}
              </Link>
              <span className="text-cap1-md text-black">&nbsp;동의 (필수)</span>
            </div>
          </div>

          <div className="gap-x-6pxr flex flex-row items-center">
            <button type="button" onClick={() => toggleState('marketingConsent')}>
              <CheckboxIcons state={checkboxState(termsAgreeState.marketingConsent)} />
            </button>

            <div>
              <Link href="#" className="text-cap1-md text-audio-bar">
                마케팅정보수신{' '}
              </Link>
              <span className="text-cap1-md text-black">&nbsp;동의 (선택)</span>
            </div>
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <RegisterButton className="mt-22pxr" disabled={!isRegisterAvailable} type="submit" />
      </form>
      {/* 로그인 페이지 이동 버튼 */}
      <div className="mt-44pxr flex w-full items-center justify-center">
        <span className="text-b4-rg text-gray-200">이미 계정이 있으신가요?</span>
        <Link href="/auth/login" className="text-t7-sb ml-2 cursor-pointer text-black underline">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
