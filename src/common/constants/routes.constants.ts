import { FileType } from '@common/types/file-type.enum';

export const ROUTES = {
  ONBOARDING: '/onboarding',
  MAIN_WITHOUT_WS_ID: `/workspace`,
  AI_MEETING_MANAGER_WITHOUT_WS_ID: `/workspace/ai-meeting-manager`,
  SNS_EVENT_ASSISTAN_WITHOUT_WS_ID: `/workspace/sns-event-assistant`,
  TEAM_MOOD_TRACKER_WITHOUT_WS_ID: `/workspace/team-mood-tracker`,
  CALENDAR_WITHOUT_WS_ID: `/workspace/calendar`,
  MAIN: (workspaceId: string) => `/workspace/${workspaceId}`,
  AI_MEETING_MANAGER: (workspaceId: string) => `/workspace/${workspaceId}/ai-meeting-manager`,
  SNS_EVENT_ASSISTANT: (workspaceId: string) => `/workspace/${workspaceId}/sns-event-assistant`,
  TEAM_MOOD_TRACKER: (workspaceId: string) => `/workspace/${workspaceId}/team-mood-tracker`,
  CALENDAR: (workspaceId: string) => `/workspace/${workspaceId}/calendar`,

  // 파일 조회
  BUILD_DOCUMENT_ROUTE: (workspaceId: string, documentType: FileType, documentId: string) => {
    const routeMapper: Record<FileType, (workspaceId: string) => string> = {
      [FileType.AI_MEETING_MANAGER]: ROUTES.AI_MEETING_MANAGER,
      [FileType.SNS_EVENT_ASSISTANT]: ROUTES.SNS_EVENT_ASSISTANT,
      [FileType.TEAM_MOOD_TRACKER]: ROUTES.TEAM_MOOD_TRACKER,
    };

    return `${routeMapper[documentType](workspaceId)}/${documentId}`;
  },
} as const;
