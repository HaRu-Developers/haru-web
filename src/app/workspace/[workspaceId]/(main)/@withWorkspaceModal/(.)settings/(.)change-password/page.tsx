'use client';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import ChangePasswordModal from '@common/components/modals/ChangePasswordModal/ChangePasswordModal.client';

const ChangePasswordModalPage = () => {
  return (
    <ModalLayout>
      <ChangePasswordModal
        onClose={() => history.back()}
        onNextStep={() => console.log('Next step triggered')}
      />
    </ModalLayout>
  );
};

export default ChangePasswordModalPage;
