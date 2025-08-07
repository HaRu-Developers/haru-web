import GoogleLoginButton from '@common/components/buttons/48px/GoogleLoginButton/GoogleLoginButton.client';

import DdoneunDivider from '@features/auth/components/DdoneunDivider/DdoneunDivider.server';
import AlreadyHaveAccountButton from '@features/auth/components/register-page/AlreadyHaveAccountButton/AlreadyHaveAccountButton.server';
import RegisterForm from '@features/auth/components/register-page/RegisterForm/RegisterForm.client';
import RegisterGreetingText from '@features/auth/components/register-page/RegisterGreetingText/RegisterGreetingText.server';

const RegisterPage = () => {
  return (
    <div className="w-414pxr flex flex-col items-center justify-center">
      {/* 인사말 컨테이너 */}
      <RegisterGreetingText />
      {/* 구글 회원가입 버튼 */}
      <GoogleLoginButton className="mt-50pxr" buttonText="Google로 회원가입하기" />
      {/* 또는 */}
      <DdoneunDivider className="my-24pxr" />
      {/* 폼 : 이메일, 이름, 비밀번호, 비밀번호 확인 */}
      <RegisterForm />
      {/* 로그인 페이지 이동 버튼 */}
      <AlreadyHaveAccountButton />
    </div>
  );
};

export default RegisterPage;
