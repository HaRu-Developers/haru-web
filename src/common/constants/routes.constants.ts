import { FileType } from '@common/types/file-type.enum';

export const ROUTES = {
  ONBOARDING: '/onboarding',
  MAIN: (workspaceId: string) => `/${workspaceId}`,
  AI_MEETING_MANAGER: (workspaceId: string) => `/${workspaceId}/ai-meeting-manager`,
  SNS_EVENT_ASSISTANT: (workspaceId: string) => `/${workspaceId}/sns-event-assistant`,
  TEAM_MOOD_TRACKER: (workspaceId: string) => `/${workspaceId}/team-mood-tracker`,
  CALENDAR: (workspaceId: string) => `/${workspaceId}/calendar`,

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
