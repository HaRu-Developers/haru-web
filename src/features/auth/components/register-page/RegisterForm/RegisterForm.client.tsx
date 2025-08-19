'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useCheckEmailDuplication } from '@api/user/hooks/mutations/useCheckEmailDuplication';
import { useSignupAndLoginMutation } from '@api/user/hooks/mutations/useRegisterAndLogin';

import useDebounce from '@common/hooks/useDebounce';

import RegisterButton from '@common/components/buttons/48px/RegisterButton/RegisterButton.client';
import InputOnboarding from '@common/components/inputs/InputOnboarding/InputOnboarding.client';
import {
  OnboardingState,
  OnboardingType,
} from '@common/components/inputs/InputOnboarding/InputOnboarding.types';

import TermsAgreeCheckbox from '../TermsAgreeCheckbox/TermsAgreeCheckbox.client';
import { TermsAgreeState } from '../TermsAgreeCheckbox/TermsAgreeCheckbox.types';

const RegisterForm = () => {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>('');
  const debouncedEmail = useDebounce(email, 300); // 이메일 입력에 대한 디바운스 적용

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [isAvailableEmail, setIsAvailableEmail] = useState<boolean | null>(null);

  const [termsAgreeState, setTermsAgreeState] = useState<TermsAgreeState>({
    serviceTerms: false,
    privacyPolicy: false,
    marketingConsent: false,
  });

  // useRegister 훅 대신 새로운 통합 훅을 사용합니다.
  // 이 훅은 성공 시 자동으로 로그인 처리 및 페이지 이동까지 담당합니다.
  const { mutate: signupAndLogin } = useSignupAndLoginMutation();
  const { mutate: checkEmailDuplication } = useCheckEmailDuplication({
    onAvailable: () => setIsAvailableEmail(true),
    onUnavailable: () => setIsAvailableEmail(false),
  });
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // URL에서 'token' 쿼리 파라미터 값을 읽어옵니다. 초대 링크가 아니면 null이 됩니다.
    const token = searchParams.get('token');

    // 통합 회원가입 함수를 호출합니다.
    // 폼 데이터와 함께 token 값을 전달하여, 초대 가입인지 일반 가입인지 서버에 알려줍니다.

    signupAndLogin({
      email,
      name,
      password,
      marketingAgreed: termsAgreeState.marketingConsent,
      token: token || undefined, // token이 null이면 undefined로 전달
    });
  };

  /**
   * 회원가입 가능 여부를 판단하는 로직
   *
   * 이메일, 이름, 비밀번호, 비밀번호 확인이 모두 입력되어 있고,
   * 비밀번호와 비밀번호 확인이 일치하며,
   * 서비스 이용 약관과 개인정보 처리 방침에 동의한 경우에만 회원가입 버튼이 활성화됩니다.
   */
  const isRegisterAvailable =
    email &&
    isAvailableEmail &&
    name &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    termsAgreeState.serviceTerms &&
    termsAgreeState.privacyPolicy;

  useEffect(() => {
    if (debouncedEmail) {
      checkEmailDuplication({ email: debouncedEmail });
    }
  }, [debouncedEmail, checkEmailDuplication]);

  return (
    <form className="gap-y-20pxr flex flex-col" onSubmit={handleRegister}>
      {/* <div> */}
      {/* TODO: 기획 단 UX 라이팅에 따라 변경 필요 */}
      <InputOnboarding
        title="이메일 주소"
        inputValue={email}
        placeholder="이메일 주소를 입력해 주세요"
        onChange={setEmail}
        state={isAvailableEmail === false ? OnboardingState.ERROR : undefined}
        message={isAvailableEmail === false ? '이미 사용 중인 계정입니다.' : undefined}
      />
      {/* {isAvailableEmail === false && (
          <span className="mt-6pxr text-cap1-rg text-system-red">이미 사용 중인 계정입니다.</span>
        )} */}
      {/* </div> */}
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
      <RegisterButton
        className="mt-22pxr"
        disabled={!isRegisterAvailable}
        type="submit"
      ></RegisterButton>
    </form>
  );
};

export default RegisterForm;
