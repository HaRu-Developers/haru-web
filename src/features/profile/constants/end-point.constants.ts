export const API_ENDPOINTS = {
  USERS: '/users',
  READ_USER: '/users/info',
  UPDATE_USER: '/users/info',
  WORKSPACES: '/workspaces',
  WORKSPACE_DETAIL: (workspaceId: number) => `/workspace/${workspaceId}`,
} as const;
