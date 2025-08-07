import LoginOnBoarding from '@common/components/onboarding/LoginOnBoaring/LoginOnBoarding.client';

import RightLoginPage from '@features/auth/components/login-page/RightLoginPage/RightLoginPage.client';

const LoginPage = () => {
  return (
    <div className="flex w-full flex-row">
      <LoginOnBoarding />
      <div className="flex w-[50vw] items-center justify-center">
        <RightLoginPage />
      </div>
    </div>
  );
};

export default LoginPage;
