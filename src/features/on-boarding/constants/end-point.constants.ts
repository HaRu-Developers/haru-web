export const ON_BOARDING_API_ENDPOINTS = {
  WORKSPACES: '/workspaces',
  INVITE_MEMBERS: '/workspaces/invite',
  WORKSPACE_DETAIL: (workspaceId: string) => `/workspace/${workspaceId}`,
} as const;
