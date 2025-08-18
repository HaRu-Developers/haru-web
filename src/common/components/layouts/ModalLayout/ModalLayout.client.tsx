'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import ModalPortal from '@common/components/ModalPortal/ModalPortal.client';

import { ModalLayoutProps } from './ModalLayout.types';

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const router = useRouter();

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
        className="bg-background-dimmed fixed inset-0 z-2 flex h-full w-full items-center justify-center"
        onClick={() => router.back()}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </ModalPortal>
  );
};

export default ModalLayout;
