import { Speech } from '@features/ai-meeting-manager/types/meeting.types';

export interface SpeechPanelProps {
  speeches: Speech[];
  isMeetingPage: boolean;
  meetingStartTime: string;
}
