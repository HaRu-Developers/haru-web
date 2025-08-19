import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import MeetingPanel from '@features/ai-meeting-manager/components/panels/MeetingPanel/MeetingPanel.client';

const AiMeetingProceedingPage = () => {
  return (
    <section className="scrollbar-component max-h-[calc(100dvh-var(--gnb-top-height))] flex-1">
      <MeetingPanel pageType={AiMeetingPageType.MEETING} />
    </section>
  );
};

export default AiMeetingProceedingPage;
