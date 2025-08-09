export enum FileType {
  AI_MEETING_MANAGER = 'AI_MEETING_MANAGER',
  SNS_EVENT_ASSISTANT = 'SNS_EVENT_ASSISTANT',
  TEAM_MOOD_TRACKER = 'TEAM_MOOD_TRACKER',
}

export const SNS_EVENT_ASSISTANT_LINK = 'SNS_EVENT_ASSISTANT_LINK' as const;
export type SnsEventAssistantLinkType = typeof SNS_EVENT_ASSISTANT_LINK;

export type ExtendedFileType = FileType | SnsEventAssistantLinkType;
