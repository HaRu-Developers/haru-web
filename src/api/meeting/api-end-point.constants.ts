export const MEETING_API_ENDPOINTS = {
  CREATE_NEW_MEETINNG_MINUTES: 'meetings',
  MEETING_MINUTES_LIST: (workspaceId: string) => `/meetings/workspaces/${workspaceId}`,
  MEETING_MINUTES_DETAIL: (meetingId: string) => `/meetings/${meetingId}/ai-proceeding`,
  DELETE_MEETING_MINUTES: (meetingId: string) => `/meetings/${meetingId}`,
  EDIT_MEETING_MINUTES_TITLE: (meetingId: string) => `/meetings/${meetingId}/title`,
  EDIT_MEETING_MINUTES_PROCEEDING: (meetingId: string) => `/meetings/${meetingId}`,
} as const;
