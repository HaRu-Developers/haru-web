export const API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: number | null) => `workspaces/${workspaceId}/sidebar?workspaceId`,
} as const;
