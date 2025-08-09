'use client';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';
import CreateMeetingMinutesModal from '@/common/components/modals/CreateMeetingMinutesModal/CreateMeetingMinutesModal.client';

const CreateNewMeetingMinutesModalPage = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <ModalLayout>
      <CreateMeetingMinutesModal
        workspaceId={workspaceId}
        onClose={() => router.back()}
        onNextStep={(meetingId) => router.replace(ROUTES.AI_MEETING(workspaceId, meetingId))} // replace를 쓰면 히스토리에 모달 경로가 남지 않음
      />
    </ModalLayout>
  );
};

export default CreateNewMeetingMinutesModalPage;
