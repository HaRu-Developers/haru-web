'use client';

import { useEffect } from 'react';

import { useGetUserInfo } from '@api/user/hooks/queries/useGetUserInfo';

import { useAuthStoreActions } from '@features/auth/hooks/useAuthStore';

const GetUserInfo = () => {
  const { data, isSuccess } = useGetUserInfo();

  const { setUser } = useAuthStoreActions();

  // 데이터 조회가 성공하면, 그 결과를 Zustand 스토어에 저장
  useEffect(() => {
    if (isSuccess && data?.result) {
      const userInfo = data.result;
      setUser({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        imageUrl: userInfo.imageUrl ?? null,
      });
    }
  }, [isSuccess, data, setUser]);

  return null;
};

export default GetUserInfo;
