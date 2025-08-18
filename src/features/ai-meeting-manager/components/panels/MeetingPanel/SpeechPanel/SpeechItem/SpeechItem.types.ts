import { Question } from '@features/ai-meeting-manager/types/meeting.types';

export interface SpeechItemProps {
  speechId: number;
  text: string;
  speakerId: string;
  questions: Question[];
  startTime: string;
  meetingStartTime: string;
}
