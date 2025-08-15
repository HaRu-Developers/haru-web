import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';
import SpeechPanel from '@features/ai-meeting-manager/components/panels/LeftPanel/SpeechPanel/SpeechPanel.client';
import RightPanel from '@features/ai-meeting-manager/components/panels/RightPanel/RightPanel.client';

const AiMeetingProceedingPage = () => {
  return (
    <div className="flex">
      <div className="scrollbar-component max-h-[calc(100dvh-var(--gnb-top-height))] flex-1 overflow-y-auto">
        <MeetingHeader />
        <SpeechPanel page={AiMeetingPageType.MEETING} />
      </div>
      <RightPanel />
    </div>
  );
};

export default AiMeetingProceedingPage;
