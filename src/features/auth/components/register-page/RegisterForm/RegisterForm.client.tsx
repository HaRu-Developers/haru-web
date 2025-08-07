'use client';

import { useState } from 'react';

import RegisterButton from '@common/components/buttons/48px/RegisterButton/RegisterButton.client';
import InputOnboarding from '@common/components/inputs/InputOnboarding/InputOnboarding.client';
import { OnboardingType } from '@common/components/inputs/InputOnboarding/InputOnboarding.types';

import { useRegister } from '@apis/user/hooks/mutations/useRegister';

import TermsAgreeCheckbox from '../TermsAgreeCheckbox/TermsAgreeCheckbox.client';
import { TermsAgreeState } from '../TermsAgreeCheckbox/TermsAgreeCheckbox.types';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [termsAgreeState, setTermsAgreeState] = useState<TermsAgreeState>({
    serviceTerms: false,
    privacyPolicy: false,
    marketingConsent: false,
  });

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

  const isRegisterAvailable =
    email &&
    name &&
    password &&
    confirmPassword &&
    termsAgreeState.serviceTerms &&
    termsAgreeState.privacyPolicy;

  return (
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
      <TermsAgreeCheckbox
        termsAgreeState={termsAgreeState}
        setTermsAgreeState={setTermsAgreeState}
      />

      {/* 회원가입 버튼 */}
      <RegisterButton className="mt-22pxr" disabled={!isRegisterAvailable} type="submit" />
    </form>
  );
};

export default RegisterForm;
