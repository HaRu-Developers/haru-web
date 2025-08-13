import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';
import UtterancePanel from '@features/ai-meeting-manager/components/UtterancePanel/UtterancePanel.server';
import RightPanel from '@features/ai-meeting-manager/components/panels/RightPanel/RightPanel.client';

const AiMeetingProceedingPage = () => {
  return (
    <div className="flex">
      <div className="scrollbar-component max-h-[calc(100dvh-var(--gnb-top-height))] flex-1 overflow-y-auto">
        <MeetingHeader />
        <UtterancePanel page={AiMeetingPageType.MEETING} />
      </div>
      <RightPanel />
    </div>
  );
};

export default AiMeetingProceedingPage;
