export const WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS = {
  SNS_EVENT_ASSISTANT_CREATE: (workspaceId: string) => `sns/${workspaceId}`,
  SNS_EVENT_ASSISTANT_LIST_DETAIL: (workspaceId: string) => `sns/${workspaceId}/list`,
  SNS_EVENT_ASSISTANT_EDIT: (snsEventId: string) => `sns/${snsEventId}`,
  SNS_EVENT_ASSISTANT_DELETE: (snsEventId: string) => `sns/${snsEventId}`,
  SNS_EVENT_ASSISTANT_DETAIL: (snsEventId: string) => `sns/${snsEventId}`,
  SNS_EVENT_ASSISTANT_LIST_DOWNLOAD: (snsEventId: string) => `sns/${snsEventId}/list/download`,
  SNS_EVENT_ASSISTANT_INSTAGRAM: (workspaceId: string) => `sns/${workspaceId}/instagram`,
} as const;
