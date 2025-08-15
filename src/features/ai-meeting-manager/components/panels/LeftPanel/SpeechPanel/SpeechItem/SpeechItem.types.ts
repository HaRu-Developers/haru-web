import { Question } from '@features/ai-meeting-manager/types/meeting.types';

export interface SpeechItemProps {
  speechId: string;
  text: string;
  speakerId: string;
  hasQuestion?: boolean;
  questions: Question[];
  startTime: string;
  calcSeekSeconds: (speechStartIso: string) => number;
}
