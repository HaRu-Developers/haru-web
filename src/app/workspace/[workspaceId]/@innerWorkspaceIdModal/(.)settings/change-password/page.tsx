'use client';

import { useRouter } from 'next/navigation';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import ChangePasswordModal from '@common/components/modals/ChangePasswordModal/ChangePasswordModal.client';

const ChangePasswordModalPage = () => {
  console.log('ChangePasswordModalPage');
  const router = useRouter();

  return (
    <ModalLayout>
      <ChangePasswordModal
        onClose={() => router.back()}
        onNextStep={() => console.log('Next step triggered')}
      />
    </ModalLayout>
  );
};

export default ChangePasswordModalPage;
