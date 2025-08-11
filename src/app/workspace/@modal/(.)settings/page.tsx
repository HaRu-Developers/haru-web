'use client';

import { useParams } from 'next/navigation';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import ProfileSelectModal from '@common/components/modals/ProfileSelectModal/ProfileSelectModal.client';

const SettingModalPage = () => {
  const params = useParams<{ workspaceId?: string }>();
  const workspaceId = params.workspaceId;
  if (!workspaceId) {
    return <div>워크스페이스 ID가 없습니다.</div>;
  }
  return (
    <ModalLayout>
      <ProfileSelectModal
        workspaceId={workspaceId}
        onClose={() => history.back()}
        onNextStep={() => console.log('Next step triggered')}
      />
    </ModalLayout>
  );
};

export default SettingModalPage;
