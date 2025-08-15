export const MEETING_API_ENDPOINTS = {
  CREATE_NEW_MEETINNG_MINUTES: 'meetings',
  MEETING_MINUTES_LIST: (workspaceId: string) => `/meetings/workspaces/${workspaceId}`,
  MEETING_MINUTES_DETAIL: (meetingId: string) => `/meetings/${meetingId}/ai-proceeding`,
  MEETING_MINUTES_DOWNLOAD_LINK: (meetingId: string) =>
    `/meetings/${meetingId}/ai-proceeding/download`,
  MEETING_MINUTES_SPEECH_QUESTION: (meetingId: string) => `/meetings/${meetingId}/transcript`,
  MEETING_MINUTES_END: (meetingId: string, year: string) => `/meetings/${meetingId}/end/${year}`,
  DELETE_MEETING_MINUTES: (meetingId: string) => `/meetings/${meetingId}`,
  EDIT_MEETING_MINUTES_TITLE: (meetingId: string) => `/meetings/${meetingId}/title`,
  EDIT_MEETING_MINUTES_PROCEEDING: (meetingId: string) => `/meetings/${meetingId}`,
} as const;
