'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { ToastType } from '@common/components/toast/types/toast.types';

import { ToastProps } from './Toast.types';

const Toast = ({ toast }: ToastProps) => {
  const { key, type, text, duration } = toast;
  const [isEntering, setIsEntering] = useState(true); // 등장
  const [isRemoving, setIsRemoving] = useState(false); // 사라짐
  const { removeToast } = useToastActions();

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsEntering(false), 10);
    const removeTimer = setTimeout(() => setIsRemoving(true), duration ?? 2000);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(removeTimer);
    };
  }, [key]);

  useEffect(() => {
    if (isRemoving) {
      const timeout = setTimeout(() => removeToast(key), 500); // transition 시간과 맞춤
      return () => clearTimeout(timeout);
    }
  }, [isRemoving]);

  const handleClick = () => {
    setIsRemoving(true);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      onClick={handleClick}
      className={clsx(
        'gap-6pxr border-stroke-200 px-24pxr py-12pxr shadow-audio-bar h-50pxr w-300pxr flex cursor-pointer items-center justify-center overflow-hidden rounded border-solid bg-gray-700 text-center text-ellipsis whitespace-nowrap transition-all duration-500 ease-in-out',
        {
          'translate-y-4 opacity-0': isEntering, // 처음엔 아래에서 등장
          'translate-y-0 scale-y-100 opacity-100': !isEntering && !isRemoving, // 보임
          '-translate-y-4 scale-y-0 opacity-0': isRemoving, // 접히며 사라짐
          // 색상
          'text-secondary-green': type === ToastType.SUCCESS,
          'text-system-red': type === ToastType.ERROR,
          'text-black': type === ToastType.INFO,
        },
      )}
    >
      {text}
    </div>
  );
};

export default Toast;
