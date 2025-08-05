'use client';

import { useRouter } from 'next/navigation';

import ModalPortal from '@common/components/ModalPortal/ModalPortal.client';

import { ModalLayoutProps } from './ModalLayout.types';

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalPortal>
      <div
        className="bg-background-dimmed fixed inset-0 z-2 flex h-full w-full items-center justify-center"
        onClick={handleClose}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </ModalPortal>
  );
};

export default ModalLayout;
