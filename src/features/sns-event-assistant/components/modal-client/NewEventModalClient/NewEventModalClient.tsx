'use client';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import CreateNewEventModal from '@common/components/modals/CreateNewEventModal/CreateNewEventModal.client';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';

const NewEventModalClient = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const handleClose = () => {
    router.back();
  };

  const handleNextStep = () => {
    router.push(ROUTES.SNS_EVENT_ASSISTANT.CREATE(workspaceId));
  };

  return (
    <ModalLayout>
      <CreateNewEventModal onClose={handleClose} onNextStep={handleNextStep} />
    </ModalLayout>
  );
};

export default NewEventModalClient;
