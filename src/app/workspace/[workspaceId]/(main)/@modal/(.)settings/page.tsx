'use client';

import { useParams } from 'next/navigation';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import ProfileSelectModal from '@common/components/modals/ProfileSelectModal/ProfileSelectModal.client';

const SettingModalPage = () => {
  const params = useParams<{ workspaceId?: string }>();
  const workspaceId = params.workspaceId ?? null;
  return (
    <ModalLayout>
      <ProfileSelectModal
        workspaceId={Number(workspaceId)}
        onClose={() => history.back()}
        onNextStep={() => console.log('Next step triggered')}
      />
    </ModalLayout>
  );
};

export default SettingModalPage;
