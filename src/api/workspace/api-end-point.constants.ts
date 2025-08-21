export const WORKSPACE_API_END_POINTS = {
  WORKSPACE_DETAIL: (workspaceId: string) => `workspaces/${workspaceId}/edit`,
  RECENT_DOCUMENTS: (workspaceId: string) => `workspaces/${workspaceId}/sidebar`,
  WORKSPACE_EDIT: (workspaceId: string) => `workspaces/${workspaceId}`,
  SEARCH_DOCUMENTS: (workspaceId: string) => `workspaces/${workspaceId}`,
  CALENDAR: (workspaceId: string | null) => `workspaces/${workspaceId}/calendar`,
  RECENT_BOXED_FILES: (workspaceId: string) => `workspaces/${workspaceId}/recent`,
  MY_WORKSPACE: '/workspaces/me',
} as const;
