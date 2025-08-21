'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';
import SurveyLinkCreatedModal from '@common/components/modals/SurveyLinkCreatedModal/SurveyLinkCreatedModal.client';

import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTab.types';

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
      ROUTES.DETAIL_DOCUMENTS_DEFAULT[FileType.TEAM_MOOD_TRACKER](
        workspaceId,
        moodTrackerHashedId,
        TeamMoodReportTabType.SURVEY_LIST,
      ),
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
