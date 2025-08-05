import { FileType } from '@common/types/file-type.enum';

export const ROUTES = {
  ONBOARDING: '/onboarding',
  MAIN: (workspaceId: number) => `/${workspaceId}`,
  AI_MEETING_MANAGER: (workspaceId: number) => `/${workspaceId}/ai-meeting-manager`,
  SNS_EVENT_ASSISTANT: (workspaceId: number) => `/${workspaceId}/sns-event-assistant`,
  TEAM_MOOD_TRACKER: (workspaceId: number) => `/${workspaceId}/team-mood-tracker`,
  CALENDAR: (workspaceId: number) => `/${workspaceId}/calendar`,

  // 파일 조회
  BUILD_DOCUMENT_ROUTE: (workspaceId: number, documentType: FileType, documentId: number) => {
    const routeMapper: Record<FileType, (workspaceId: number) => string> = {
      [FileType.AI_MEETING_MANAGER]: ROUTES.AI_MEETING_MANAGER,
      [FileType.SNS_EVENT_ASSISTANT]: ROUTES.SNS_EVENT_ASSISTANT,
      [FileType.TEAM_MOOD_TRACKER]: ROUTES.TEAM_MOOD_TRACKER,
    };

    return `${routeMapper[documentType](workspaceId)}/${documentId}`;
  },
} as const;
