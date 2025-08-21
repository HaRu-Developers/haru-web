'use client';

import { useRouter } from 'next/navigation';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';
import LoadingModal from '@common/components/modals/LoadingModal/LoadingModal.client';
import { LoadingModalType } from '@common/components/modals/LoadingModal/LoadingModal.types';

const RequestSurveyCreationModal = () => {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <ModalLayoutWithoutPortal>
      <LoadingModal onClose={handleClose} modalType={LoadingModalType.CREATE_SURVEY} />
    </ModalLayoutWithoutPortal>
  );
};

export default RequestSurveyCreationModal;
