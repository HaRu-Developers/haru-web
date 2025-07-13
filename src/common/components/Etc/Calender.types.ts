export enum DocumentType {
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
}

export interface File {
  title: string;
  type: DocumentType;
}

export interface CalendarSliceProps {
  date: Date;
  files?: File[];
  index: number;
  isVisible: boolean;
}

export interface CalendarProps {
  startDate: Date;
  endDate: Date;
  operatingMonth: number;
  documents: File[][];
}
