import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import GoogleLoginFail from '@features/auth/components/google-oauth/GoogleLoginFail/GoogleLoginFail.client';
import GoogleLoginSuccess from '@features/auth/components/google-oauth/GoogleLoginSuccess/GoogleLoginSuccess.client';

type GoogleCallbackQueryType = {
  status: 'success' | 'fail';
  accessToken?: string;
  refreshToken?: string;
};

type SearchParams = Promise<GoogleCallbackQueryType>;

interface GoogleOAuthCallbackPageProps {
  searchParams: SearchParams;
}

const GoogleOAuthCallbackPage = async ({ searchParams }: GoogleOAuthCallbackPageProps) => {
  const { status, accessToken, refreshToken } = await searchParams;

  if (status === 'success') {
    // Handle successful authentication
    if (!accessToken || !refreshToken) {
      return redirect(ROUTES.AUTH.REGISTER);
    }

    return <GoogleLoginSuccess accessToken={accessToken} refreshToken={refreshToken} />;
  } else if (status === 'fail') {
    // Handle failed authentication
    console.warn('Google OAuth failed');
    return <GoogleLoginFail />;
  } else {
    return notFound();
  }
};

export default GoogleOAuthCallbackPage;
