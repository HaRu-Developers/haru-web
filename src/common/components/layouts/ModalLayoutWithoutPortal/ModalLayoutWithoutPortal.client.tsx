'use client';

import { useRouter } from 'next/navigation';

import { ModalLayoutProps } from '@common/components/layouts/ModalLayout/ModalLayout.types';

interface ModalLayoutWithoutPortalProps extends ModalLayoutProps {
  onClose?: () => void;
}

const ModalLayoutWithoutPortal = ({ children, onClose }: ModalLayoutWithoutPortalProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className="bg-background-dimmed fixed inset-0 z-2 flex h-full w-full items-center justify-center"
      onClick={onClose ?? handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default ModalLayoutWithoutPortal;
