import { LeftTabType } from '@features/ai-meeting-manager/constants/tabs';

import { LeftPanelProps } from './LeftPanel.types';
import MeetingSummary from './components/MeetingSummary/MeetingSummary.client';
import MeetingVoiceLog from './components/MeetingVoiceLog/MeetingVoiceLog.server';

const LeftPanel = ({ tab }: LeftPanelProps) => {
  switch (tab) {
    case LeftTabType.MEETING_SUMMARY:
      return <MeetingSummary />;
    case LeftTabType.MEETING_VOICE_LOG:
      return <MeetingVoiceLog />;
  }
};

export default LeftPanel;
