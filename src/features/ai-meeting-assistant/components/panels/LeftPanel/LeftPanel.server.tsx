import { LeftTabType } from '@features/ai-meeting-assistant/constants/tabs';

import { LeftPanelProps } from './LeftPanel.types';
import AINotesPanel from './components/AINotesPanel/AINotesPanel.client';
import VoiceRecordingsPanel from './components/VoiceRecordingsPanel/VoiceRecordingsPanel.server';

const LeftPanel = ({ tab }: LeftPanelProps) => {
  switch (tab) {
    case LeftTabType.AiNotes:
      return <AINotesPanel />;
    case LeftTabType.VoiceRecordings:
      return <VoiceRecordingsPanel />;
  }
};

export default LeftPanel;
