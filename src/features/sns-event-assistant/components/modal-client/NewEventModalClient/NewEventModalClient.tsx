'use client';

import { useParams, useRouter } from 'next/navigation';

import CreateNewEventModal from '@common/components/modals/CreateNewEventModal/CreateNewEventModal.client';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';

const NewEventModalClient = () => {
  const router = useRouter();
  const { workspaceId } = useParams();

  const handleClose = () => {
    router.back();
  };

  const handleNextStep = () => {
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}/sns-event-assistant/creating-event`);
    } else {
      console.error('workspaceId가 없습니다.');
    }
  };

  return (
    <ModalLayout>
      <CreateNewEventModal onClose={handleClose} onNextStep={handleNextStep} />
    </ModalLayout>
  );
};

export default NewEventModalClient;
