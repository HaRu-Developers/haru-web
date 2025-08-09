'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';
import CreateMeetingMinutesModal from '@/common/components/modals/CreateMeetingMinutesModal/CreateMeetingMinutesModal.client';

const CreateNewMeetingMinutesModalPage = () => {
  const router = useRouter();
  return (
    <ModalLayout>
      <CreateMeetingMinutesModal
        onClose={() => router.back()}
        onNextStep={() => router.push(ROUTES.AI_MEETING)}
      />
    </ModalLayout>
  );
};

export default CreateNewMeetingMinutesModalPage;
