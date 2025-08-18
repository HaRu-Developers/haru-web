import { Speech } from '@features/ai-meeting-manager/types/meeting.types';
import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

export interface SpeechPanelProps {
  speeches: Speech[];
  pageType: AiMeetingPageType;
  meetingStartTime: string;
}
