export const ROUTES = {
  MAIN: '/main',
  AI_MEETING_MANAGER: '/ai-meeting-manager',
  SNS_EVENT_ASSISTANT: '/sns-event-assistant',
  TEAM_MOOD_TRACKER: '/team-mood-tracker',
  CALENDAR: '/calendar',
  WORKSPACE: (workspaceId: bigint) => `/workspace/${workspaceId}`,
} as const;
