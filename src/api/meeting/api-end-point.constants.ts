export const MEETING_API_ENDPOINTS = {
  MEETING_MINUTES_LIST: (workspaceId: string) => `/meetings/workspaces/${workspaceId}`,
} as const;
