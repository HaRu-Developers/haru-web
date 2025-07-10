import { LeftTabType } from '@features/ai-meeting-manager/constants/tabs';

import { LeftPanelProps } from './LeftPanel.types';
import AiNotesPanel from './components/AiNotesPanel/AiNotesPanel.client';
import VoiceRecordingsPanel from './components/VoiceRecordingsPanel/VoiceRecordingsPanel.server';

const LeftPanel = ({ tab }: LeftPanelProps) => {
  switch (tab) {
    case LeftTabType.MEETING_SUMMARY:
      return <AiNotesPanel />;
    case LeftTabType.MEETING_VOICE_LOG:
      return <VoiceRecordingsPanel />;
  }
};

export default LeftPanel;
