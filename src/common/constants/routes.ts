export const ROUTES = {
  MAIN: '/',
  AI_MEETING_MANAGER: '/ai-meeting-assistant',
  SNS_EVENT_ASSISTANT: '/sns-event-assistant',
  TEAM_MOOD_TRACKER: '/team-mood-tracker',
  CALENDAR: '/calendar',
  WORKSPACE: (workspaceId: string) => `/workspace/${workspaceId}`,
} as const;
