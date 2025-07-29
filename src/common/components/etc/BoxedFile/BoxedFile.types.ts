export enum DocumentType {
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
}
export interface BoxedFileProps {
  title: string;
  lastOpened?: string;
  thumbnailUrl?: string;
  documentType: DocumentType;
  onClick: () => void;
}
