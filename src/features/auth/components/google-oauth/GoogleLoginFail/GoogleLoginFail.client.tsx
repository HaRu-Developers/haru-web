'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

const GoogleLoginFail = () => {
  const router = useRouter();

  useEffect(() => {
    alert('Google 로그인에 실패했습니다. 다시 시도해주세요.');
    router.push(ROUTES.AUTH.LOGIN);
  }, []);

  return null;
};

export default GoogleLoginFail;
