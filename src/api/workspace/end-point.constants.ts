export const WORKSPACE_API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: string) => `workspaces/${workspaceId}/sidebar`,
} as const;
