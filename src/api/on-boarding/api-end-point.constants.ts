export const WORKSPACES_ON_BOARDING_API_ENDPOINTS = {
  WORKSPACES: '/workspaces',
  INVITE_MEMBERS: '/workspaces/invite',
  WORKSPACE_DETAIL: (workspaceId: string) => `/workspace/${workspaceId}`,
  LINK_INSTAGRAM: (workspaceId: string) => `/sns/${workspaceId}/link-instagram`,
} as const;
