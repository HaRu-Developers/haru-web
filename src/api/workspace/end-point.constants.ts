export const WORKSPACE_API_ENDPOINTS = {
  RECENT_DOCUMENTS: (workspaceId: string) => `workspaces/${workspaceId}/sidebar?workspaceId`,
  MY_WORKSPACE: '/workspaces/me',
} as const;
