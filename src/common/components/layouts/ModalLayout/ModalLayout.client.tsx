'use client';

import { useRouter } from 'next/navigation';

import { ModalLayoutProps } from './ModalLayout.types';

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className="bg-background-dimmed fixed inset-0 z-10 flex h-full w-full items-center justify-center"
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default ModalLayout;
