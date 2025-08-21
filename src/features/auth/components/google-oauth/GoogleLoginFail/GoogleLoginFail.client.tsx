'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ToastType } from '@common/types/toast.types';

import { ROUTES } from '@common/constants/routes.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

const GoogleLoginFail = () => {
  const router = useRouter();
  const { addToast } = useToastActions();

  useEffect(() => {
    addToast({
      text: 'Google 로그인에 실패했습니다. 다시 시도해주세요.',
      type: ToastType.ERROR,
    });
    router.push(ROUTES.AUTH.LOGIN);
  }, []);

  return null;
};

export default GoogleLoginFail;
