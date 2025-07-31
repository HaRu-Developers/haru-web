export const API_ENDPOINTS = {
  WORKSPACES: '/workspaces',
  INVITE_MEMBERS: '/workspaces/invite',
  WORKSPACE_DETAIL: (workspaceId: number) => `/workspace/${workspaceId}`,
} as const;
