import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';
import RightPanel from '@features/ai-meeting-manager/components/panels/RightPanel/RightPanel.client';

const AiMeetingProceedingPage = () => {
  return (
    <div className="flex">
      <MeetingHeader />
      <RightPanel />
    </div>
  );
};

export default AiMeetingProceedingPage;
