'use client';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';

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
    console.log('onMoveToSetQuestions Triggered', data);
    router.push(ROUTES.TEAM_MOOD_TRACKER.CREATE_SURVEY(workspaceId, data));
  };

  return (
    <ModalLayoutWithoutPortal>
      <CreateNewTeamMoodTrackerModal onClose={onModalClose} onNextStep={onMoveToSetQuestions} />
    </ModalLayoutWithoutPortal>
  );
};

export default CreateNewSurveyModal;
