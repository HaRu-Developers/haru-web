export const WORKSPACE_API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: string | null) => `workspaces/${workspaceId}/sidebar?workspaceId`,
} as const;
