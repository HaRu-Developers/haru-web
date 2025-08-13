'use client';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';

import CreateNewTeamMoodTrackerModal from '@features/team-mood-tracker/components/modals/CreateNewTeamMoodTrackerModal/CreateNewTeamMoodTrackerModal.client';
import { CreateNewTeamMoodTrackerModalOnNextStepProps } from '@features/team-mood-tracker/components/modals/CreateNewTeamMoodTrackerModal/CreateNewTeamMoodTrackerModal.types';

const CreateNewSurveyModal = () => {
  const router = useRouter();

  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const onModalClose = () => {
    router.back();
  };

  const onMoveToSetQuestions = (data: CreateNewTeamMoodTrackerModalOnNextStepProps) => {
    router.push(ROUTES.TEAM_MOOD_TRACKER.CREATE_SURVEY(workspaceId, data));
  };
  return (
    <ModalLayout>
      <CreateNewTeamMoodTrackerModal onClose={onModalClose} onNextStep={onMoveToSetQuestions} />
    </ModalLayout>
  );
};

export default CreateNewSurveyModal;
