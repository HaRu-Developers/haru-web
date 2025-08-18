'use client';

import { useCallback } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';
import CreateMeetingMinutesModal from '@/common/components/modals/CreateMeetingMinutesModal/CreateMeetingMinutesModal.client';

const CreateNewMeetingMinutesModalPage = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const handleNextStep = useCallback((meetingId: string) => {
    // replace를 쓰면 히스토리에 모달 경로가 남지 않음
    router.replace(ROUTES.AI_MEETING_MANAGER.MEETING(workspaceId, meetingId));
  }, []);

  return (
    <ModalLayout>
      <CreateMeetingMinutesModal
        workspaceId={workspaceId}
        onClose={() => router.back()}
        onNextStep={handleNextStep}
      />
    </ModalLayout>
  );
};

export default CreateNewMeetingMinutesModalPage;
