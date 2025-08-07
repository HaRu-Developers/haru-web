export const WORKSPACE_API_END_POINTS = {
  WORKSPACE_DETAIL: (workspaceId: string) => `workspaces/${workspaceId}/edit`,
  RECENT_DOCUMENTS: (workspaceId: string) => `workspaces/${workspaceId}/sidebar`,
  MY_WORKSPACE: '/workspaces/me',
} as const;
