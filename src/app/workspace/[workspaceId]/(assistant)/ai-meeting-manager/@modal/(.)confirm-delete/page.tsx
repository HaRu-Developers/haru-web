'use client';

import { useRouter } from 'next/navigation';

import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';
import DeleteModal from '@/common/components/modals/DeleteModal/DeleteModal.client';

const ConfirmDeleteMeetingMinutesModalPage = () => {
  const router = useRouter();

  return (
    <ModalLayout>
      <DeleteModal
        modalType={DeleteModalType.DELETE_MEETING_MINUTES}
        onClose={() => router.back()}
        onAbort={() => router.back()}
        onProceed={() => {}}
      />
    </ModalLayout>
  );
};

export default ConfirmDeleteMeetingMinutesModalPage;
