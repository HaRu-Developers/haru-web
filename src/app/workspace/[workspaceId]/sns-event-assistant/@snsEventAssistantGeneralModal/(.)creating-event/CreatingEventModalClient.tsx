'use client';

import { useRouter } from 'next/navigation';

import LoadingModal from '@common/components/modals/LoadingModal/LoadingModal.client';
import { LoadingModalType } from '@common/components/modals/LoadingModal/LoadingModal.types';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';

const CreatingEventModalClient = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalLayout>
      <LoadingModal modalType={LoadingModalType.SNS_EVENT} onClose={handleClose} />
    </ModalLayout>
  );
};

export default CreatingEventModalClient;
