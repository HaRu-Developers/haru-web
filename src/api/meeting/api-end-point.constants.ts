export const MEETING_API_ENDPOINTS = {
  CREATE_NEW_MEETINNG_MINUTES: 'meetings',
  MEETING_MINUTES_LIST: (workspaceId: string) => `/meetings/workspaces/${workspaceId}`,
  MEETING_MINUTES_DETAIL: (meetingId: string) => `/meetings/${meetingId}/ai-proceeding`,
} as const;
