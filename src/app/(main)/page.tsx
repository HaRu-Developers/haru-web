'use client';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

const MainPage = () => {
  const { addToast } = useToastActions();

  return (
    <>
      <div className="md:text-system-red p-10 text-center text-black">메인 페이지</div>
      <button
        onClick={() => {
          addToast({
            text: `토스트 ${Date.now().toString()}`,
            type: [ToastType.SUCCESS, ToastType.ERROR, ToastType.INFO][Date.now() % 3],
            duration: 3000, // 기본은 2000ms
          });
        }}
      >
        토스트 띄우기 버튼
      </button>
    </>
  );
};

export default MainPage;
