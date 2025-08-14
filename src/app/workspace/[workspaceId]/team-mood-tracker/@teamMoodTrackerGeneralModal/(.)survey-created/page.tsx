'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';
import SurveyLinkCreatedModal from '@common/components/modals/SurveyLinkCreatedModal/SurveyLinkCreatedModal.client';

const SurveyCreatedModal = () => {
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  console.log('SurveyCreatedModal rendered');

  const query = useSearchParams();
  const moodTrackerHashedId = query.get('moodTrackerHashedId') || '';
  const surveyLink = `https://haru.it.kr/survey/${moodTrackerHashedId}`;

  const handleClose = () =>
    router.push(
      ROUTES.BUILD_DOCUMENT_ROUTE(workspaceId, FileType.TEAM_MOOD_TRACKER, moodTrackerHashedId),
    );

  const handleEmailSendClick = () => {
    // Implement the logic to send the survey link via email
    console.log('Send survey link via email:', surveyLink);
  };

  return (
    <ModalLayoutWithoutPortal onClose={handleClose}>
      <SurveyLinkCreatedModal
        onClose={handleClose}
        onEmailSendClick={handleEmailSendClick}
        surveyLink={surveyLink}
      />
    </ModalLayoutWithoutPortal>
  );
};

export default SurveyCreatedModal;
