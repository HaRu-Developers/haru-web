'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import SendLinkToTeamByEmailButton from '@common/components/buttons/38px/SendLinkToTeamByEmailButton/SendLinkToTeamByEmailButton.client';

import DisplaySurveyLinkWithCopyButton from './DisplaySurveyLinkWithCopyButton/DisplaySurveyLinkWithCopyButton.server';
import { SurveyLinkCreatedModalProps } from './SurveyLinkCreatedModal.types';

const SurveyLinkCreatedModal = ({
  onClose,
  onEmailSendClick,
  surveyLink,
}: SurveyLinkCreatedModalProps) => {
  return (
    <div className="w-368pxr h-236pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center">
      <button onClick={onClose} className="top-22pxr right-20pxr absolute">
        <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
      </button>
      <div className="space-y-6pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">설문지 생성 완료!</p>
        <p className="text-b3-rg text-gray-300">설문 링크를 복사하여 팀원들에게 공유해 보세요.</p>
      </div>
      <div className="space-y-6pxr mt-28pxr flex flex-col items-center justify-center">
        <DisplaySurveyLinkWithCopyButton surveyLink={surveyLink} />
        <SendLinkToTeamByEmailButton onClick={onEmailSendClick} />
      </div>
    </div>
  );
};

export default SurveyLinkCreatedModal;
