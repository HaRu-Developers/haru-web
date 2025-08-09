export const WORKSPACE_API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: number | null) => `workspaces/${workspaceId}/sidebar?workspaceId`,
  SEARCH_DOCUMENTS: (workspaceId: string) => `workspaces/${workspaceId}`,
} as const;
