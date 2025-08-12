export const WORKSPACE_API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: number | null) => `workspaces/${workspaceId}/sidebar?workspaceId`,
  CALENDAR: (workspaceId: number | null) => `workspaces/${workspaceId}/calendar`,
} as const;
