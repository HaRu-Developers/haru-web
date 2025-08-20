'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import { useWorkspaceId } from '@common/hooks/useWorkspaceId';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';
import DeleteModal from '@common/components/modals/DeleteModal/DeleteModal.client';
import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';

const ConfirmDeleteMeetingMinutesModalPage = () => {
  const searchParams = useSearchParams();
  const fileType = searchParams.get('fileType') ?? '';
  const redirectUrlOnConfirm = searchParams.get('redirect') ?? '';

  const router = useRouter();

  const handleClose = () => router.back();

  // "확인" 버튼 클릭 시
  const handleProceed = () => {
    if (!redirectUrlOnConfirm) {
      throw new Error('Redirect URL is not provided');
    }
    router.push(redirectUrlOnConfirm);
  };

  switch (fileType) {
    case FileType.TEAM_MOOD_TRACKER:
      return (
        <ModalLayoutWithoutPortal>
          <DeleteModal
            modalType={DeleteModalType.DELETE_REPORT}
            onClose={handleClose}
            onAbort={handleClose}
            onProceed={handleProceed}
          />
        </ModalLayoutWithoutPortal>
      );
    default:
      return null;
  }
};

export default ConfirmDeleteMeetingMinutesModalPage;
