export enum DocumentType {
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
}

export interface DocumentFile {
  id: number; // 경로 이동을 위한 id
  title: string;
  type: DocumentType;
}
