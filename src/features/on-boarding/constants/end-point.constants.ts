export const ON_BOARDING_API_ENDPOINTS = {
  WORKSPACES: '/workspaces',
  INVITE_MEMBERS: '/workspaces/invite',
  WORKSPACE_DETAIL: (workspaceId: number) => `/workspace/${workspaceId}`,
} as const;
