'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import * as z from 'zod';

import { useCheckEmailDuplication } from '@api/user/hooks/mutations/useCheckEmailDuplication';
import { useSignupAndLoginMutation } from '@api/user/hooks/mutations/useRegisterAndLogin';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';
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
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    termsAgreeState: {
      serviceTerms: false,
      privacyPolicy: false,
      marketingConsent: false,
    },
  });

  const debouncedEmail = useDebounce(formData.email, 500); // 이메일 입력에 대한 디바운스 적용

  const [isAvailableEmail, setIsAvailableEmail] = useState<boolean | null>(null);

  const { mutate: register } = useSignupAndLoginMutation();
  const searchParams = useSearchParams();

  // useRegister 훅 대신 새로운 통합 훅을 사용합니다.
  // 이 훅은 성공 시 자동으로 로그인 처리 및 페이지 이동까지 담당합니다.
  const { mutate: checkEmailDuplication } = useCheckEmailDuplication({
    onAvailable: () => setIsAvailableEmail(true),
    onUnavailable: () => setIsAvailableEmail(false),
  });

  const { addToast } = useToastActions();

  const registerFormSchema = z
    .strictObject({
      email: z.email('유효하지 않은 이메일 입니다.').refine(() => isAvailableEmail !== false, {
        error: '이미 사용 중인 이메일 입니다.',
        path: ['duplicateEmail'],
      }),
      name: z.string().min(1, '이름을 입력해 주세요.'),
      password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
      confirmPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
      termsAgreeState: z
        .strictObject({
          serviceTerms: z.boolean(),
          privacyPolicy: z.boolean(),
          marketingConsent: z.boolean(), // 마케팅 정보 수신 동의는 선택 사항
        })
        .refine((state) => state.serviceTerms && state.privacyPolicy, {
          error: '필수 약관에 동의해 주세요.',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    });

  type RegisterFormData = z.infer<typeof registerFormSchema>;

  const registerFormValid = registerFormSchema.safeParse(formData);

  const validateField = (
    field: keyof RegisterFormData,
    value: RegisterFormData[keyof RegisterFormData],
  ) => {
    if (!value) {
      return {
        state: OnboardingState.DEFAULT,
        message: undefined,
      };
    }
    const fieldSchema = registerFormSchema.shape[field];
    const result = fieldSchema.safeParse(value);

    let state;
    let message;

    if (result.success) {
      state = OnboardingState.APPROVAL;
      if (field === 'email') {
        message = '사용 가능한 이메일 입니다.';
      } else if (field === 'password') {
        message = '사용 가능한 비밀번호 입니다.';
      } else if (field === 'confirmPassword') {
        message = '비밀번호가 일치합니다.';
      }
    } else {
      state = OnboardingState.ERROR;
      message = result.error.issues[0].message;
    }

    return {
      state,
      message,
    };
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isRequiredTermsAgreed = registerFormSchema.shape.termsAgreeState.safeParse(
      formData.termsAgreeState,
    ).success;

    if (!isRequiredTermsAgreed) {
      return addToast({
        type: ToastType.ERROR,
        text: '필수 약관에 동의해 주세요.',
      });
    } else if (!registerFormValid.success) {
      return addToast({
        type: ToastType.ERROR,
        text: '정보를 올바르게 입력해 주세요.',
      });
    }

    const requestData = registerFormValid.data;
    // URL에서 'token' 쿼리 파라미터 값을 읽어옵니다. 초대 링크가 아니면 null이 됩니다.
    const token = searchParams.get('token');

    // 통합 회원가입 함수를 호출합니다.
    // 폼 데이터와 함께 token 값을 전달하여, 초대 가입인지 일반 가입인지 서버에 알려줍니다.
    register({
      email: requestData.email,
      name: requestData.name,
      password: requestData.password,
      marketingAgreed: requestData.termsAgreeState.marketingConsent,
      token: token || undefined, // token이 null이면 undefined로 전달
    });
  };

  useEffect(() => {
    if (debouncedEmail) {
      // TODO: 이메일이 입력되고 유효한 경우에만 중복 체크를 수행하도록 변경할 것
      checkEmailDuplication({ email: debouncedEmail });
    }
  }, [checkEmailDuplication, debouncedEmail]);

  return (
    <form className="gap-y-20pxr flex flex-col" onSubmit={handleRegister}>
      {/* <div> */}
      {/* TODO: 기획 단 UX 라이팅에 따라 변경 필요 */}
      <InputOnboarding
        title="이메일 주소"
        inputValue={formData.email}
        placeholder="이메일 주소를 입력해 주세요"
        onChange={(email) => setFormData({ ...formData, email })}
        {...validateField('email', formData.email)}
      />
      {/* {isAvailableEmail === false && (
          <span className="mt-6pxr text-cap1-rg text-system-red">이미 사용 중인 계정입니다.</span>
        )} */}
      {/* </div> */}
      <InputOnboarding
        title="이름"
        inputValue={formData.name}
        placeholder="이름을 입력해 주세요"
        onChange={(name) => setFormData({ ...formData, name })}
      />
      <InputOnboarding
        title="비밀번호"
        inputValue={formData.password}
        placeholder="비밀번호를 입력해 주세요"
        onChange={(password) => setFormData({ ...formData, password })}
        {...validateField('password', formData.password)}
        type={OnboardingType.HIDE}
      />
      <InputOnboarding
        title="비밀번호 확인"
        inputValue={formData.confirmPassword}
        placeholder="동일한 비밀번호를 한 번 더 입력해 주세요"
        onChange={(confirmPassword) => setFormData({ ...formData, confirmPassword })}
        {...validateField('confirmPassword', formData.confirmPassword)}
        type={OnboardingType.HIDE}
      />
      {/* 동의 버튼들 - 서비스이용약관, 개인정보처리방침, 마케팅정보수신 동의 (이거만 선택) */}
      <TermsAgreeCheckbox
        termsAgreeState={formData.termsAgreeState}
        setTermsAgreeState={(termsAgreeState: TermsAgreeState) =>
          setFormData({ ...formData, termsAgreeState })
        }
      />

      {/* 회원가입 버튼 */}
      <RegisterButton className="mt-22pxr" disabled={!registerFormValid.success} type="submit" />
    </form>
  );
};

export default RegisterForm;
