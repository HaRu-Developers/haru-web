import { AiMeetingAssistantLeftTabType } from '@features/ai-meeting-assistant/constants/tabs';

import { AiMeetingAssistantLeftPanelProps } from './AiMeetingAssistantLeftPanel.types';
import AINotesPanel from './components/AINotesPanel/AINotesPanel.client';
import VoiceRecordingsPanel from './components/VoiceRecordingsPanel/VoiceRecordingsPanel.server';

const AiMeetingAssistantLeftPanel = ({ tab }: AiMeetingAssistantLeftPanelProps) => {
  switch (tab) {
    case AiMeetingAssistantLeftTabType.AiNotes:
      return <AINotesPanel />;
    case AiMeetingAssistantLeftTabType.VoiceRecordings:
      return <VoiceRecordingsPanel />;
  }
};

export default AiMeetingAssistantLeftPanel;
