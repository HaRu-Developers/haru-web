export const WORKSPACE_API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: number | null) => `workspaces/${workspaceId}/sidebar?workspaceId`,
} as const;
