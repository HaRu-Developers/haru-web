export const ROUTES = {
  MAIN: '/',
  AI_MEETING_MANAGER: '/ai-meeting-assistant',
  SNS_EVENT_ASSISTANT: '/sns-event-assistant',
  TEAM_MOOD_TRACKER: '/team-mood-tracker',
  CALENDAR: '/calendar',
  ONBOARDING: '/onboarding',
  WORKSPACE: (workspaceId: string) => `/workspace/${workspaceId}`,
  DOCUMENT: (documentId: string) => `/document/${documentId}`,
} as const;
