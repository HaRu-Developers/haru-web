export const ROUTES = {
  ONBOARDING: '/onboarding',
  MAIN: (workspaceId: number) => `/${workspaceId}`,
  AI_MEETING_MANAGER: (workspaceId: number) => `/${workspaceId}/ai-meeting-manager`,
  SNS_EVENT_ASSISTANT: (workspaceId: number) => `/${workspaceId}/sns-event-assistant`,
  TEAM_MOOD_TRACKER: (workspaceId: number) => `/${workspaceId}/team-mood-tracker`,
  CALENDAR: (workspaceId: number) => `/${workspaceId}/calendar`,
  DOCUMENT: (documentId: number) => `/document/${documentId}`,
} as const;
