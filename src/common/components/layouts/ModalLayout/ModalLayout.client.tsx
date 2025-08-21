'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import ModalPortal from '@common/components/ModalPortal/ModalPortal.client';

import { ModalLayoutProps } from './ModalLayout.types';

const ModalLayout = ({ children, canClickDimmed = true }: ModalLayoutProps) => {
  const router = useRouter();
  const handleDimmedClick = () => {
    if (!canClickDimmed) return;
    router.back();
  };

  // body 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className={clsx(
          'bg-background-dimmed fixed inset-0 z-2 flex h-full w-full items-center justify-center',
          canClickDimmed ? 'cursor-pointer' : 'cursor-default',
        )}
        onClick={handleDimmedClick}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </ModalPortal>
  );
};

export default ModalLayout;
