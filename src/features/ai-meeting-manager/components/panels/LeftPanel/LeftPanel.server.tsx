import { LeftTabType } from '@features/ai-meeting-manager/constants/tabs';

import { LeftPanelProps } from './LeftPanel.types';
import AINotesPanel from './components/AINotesPanel/AINotesPanel.client';
import VoiceRecordingsPanel from './components/VoiceRecordingsPanel/VoiceRecordingsPanel.server';

const LeftPanel = ({ tab }: LeftPanelProps) => {
  switch (tab) {
    case LeftTabType.AI_NOTES:
      return <AINotesPanel />;
    case LeftTabType.VOICE_RECORDINGS:
      return <VoiceRecordingsPanel />;
  }
};

export default LeftPanel;
