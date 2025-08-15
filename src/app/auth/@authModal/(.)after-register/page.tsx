'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';
import CongratulateSignUpModal from '@common/components/modals/CongratulateSignUpModal/CongratulateSignUpModal.client';

const AfterRegisterModal = () => {
  const router = useRouter();
  const handleClose = () => router.back();
  const handleCreateWorkspace = () => router.push(ROUTES.ONBOARDING);

  const query = useSearchParams();
  const isInvitedRegister = query.get('invited') === 'true';

  return (
    <ModalLayoutWithoutPortal>
      <CongratulateSignUpModal
        onClose={handleClose}
        onWorkspaceCreate={handleCreateWorkspace}
        isInvited={isInvitedRegister}
      />
    </ModalLayoutWithoutPortal>
  );
};

export default AfterRegisterModal;
