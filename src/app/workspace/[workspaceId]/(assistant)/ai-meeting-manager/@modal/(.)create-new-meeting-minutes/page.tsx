'use client';

import { useRouter } from 'next/navigation';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';
import CreateMeetingMinutesModal from '@/common/components/modals/CreateMeetingMinutesModal/CreateMeetingMinutesModal.client';

const CreateNewMeetingMinutesModalPage = () => {
  const router = useRouter();
  return (
    <ModalLayout>
      <CreateMeetingMinutesModal
        onClose={() => router.back()}
        onNextStep={() => console.log('다음 단계')}
      />
    </ModalLayout>
  );
};

export default CreateNewMeetingMinutesModalPage;
