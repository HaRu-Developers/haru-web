'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useSendEmail } from '@api/team-mood-tracker/post/mutations/useSendEmail';

import { FileType } from '@common/types/file-type.enum';
import { ToastType } from '@common/types/toast.types';

import { ROUTES } from '@common/constants/routes.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import ModalLayoutWithoutPortal from '@common/components/layouts/ModalLayoutWithoutPortal/ModalLayoutWithoutPortal.client';
import SurveyLinkCreatedModal from '@common/components/modals/SurveyLinkCreatedModal/SurveyLinkCreatedModal.client';

import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTab.types';

const SurveyCreatedModal = () => {
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const { mutate: sendEmail } = useSendEmail();
  const { addToast } = useToastActions();

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
    sendEmail({
      moodTrackerHashedId: moodTrackerHashedId,
    });
    // TODO : 근데 된지 모름 ㅋ
    addToast({
      text: '설문 링크가 이메일로 전송되었습니다.',
      type: ToastType.SUCCESS,
    });
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
