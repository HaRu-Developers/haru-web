import { FileType } from '@common/types/file-type.enum';

import { TermsModalType } from '@common/components/modals/terms/TermsModal.types';

export const ROUTES = {
  // ===== onboarding 관련 =====
  ONBOARDING: '/onboarding',
  // ===== main 관련 =====
  MAIN: {
    BASE_WITHOUT_WS: '/workspace',
    BASE_WITH_WS: (workspaceId: string) => `/workspace/${workspaceId}`,
    MODAL: {
      PRIVACY_POLICY: (workspaceId?: string) =>
        workspaceId
          ? `${ROUTES.MAIN.BASE_WITH_WS(workspaceId)}/terms?type=${TermsModalType.PRIVACY_POLICY}`
          : `${ROUTES.MAIN.BASE_WITHOUT_WS}/terms?type=${TermsModalType.PRIVACY_POLICY}`,
      TERMS_OF_SERVICE: (workspaceId?: string) =>
        workspaceId
          ? `${ROUTES.MAIN.BASE_WITH_WS(workspaceId)}/terms?type=${TermsModalType.TERMS_OF_SERVICE}`
          : `${ROUTES.MAIN.BASE_WITHOUT_WS}/terms?type=${TermsModalType.TERMS_OF_SERVICE}`,
    },
  },
  // ===== ai-meeting-manager 관련 =====
  AI_MEETING_MANAGER: {
    BASE: (workspaceId: string) => `/workspace/${workspaceId}/ai-meeting-manager`,
    // 회의 단일 조회
    MEETING: (workspaceId: string, meetingId: string) =>
      `${ROUTES.AI_MEETING_MANAGER.BASE(workspaceId)}/${meetingId}/meeting`,
    // 회의록 단일 조회
    MINUTES: (workspaceId: string, meetingId: string) =>
      `${ROUTES.AI_MEETING_MANAGER.BASE(workspaceId)}/${meetingId}/minutes`,
    // 모달 관련
    MODAL: {
      // 회의 생성 모달
      CREATE: (workspaceId: string) => `${ROUTES.AI_MEETING_MANAGER.BASE(workspaceId)}/create`,
      // 단일 회의 삭제 확인 모달
      CONFIRM_DELETE: (workspaceId: string) =>
        `${ROUTES.AI_MEETING_MANAGER.BASE(workspaceId)}/confirm-delete`,
    },
  },
  //  ===== sns event assistant 관련 =====
  SNS_EVENT_ASSISTANT: (workspaceId: string) => `//workspace/${workspaceId}/sns-event-assistant`,
  //  ===== team mood tracker 관련 =====
  TEAM_MOOD_TRACKER: (workspaceId: string) => `/workspace/${workspaceId}/team-mood-tracker`,
  //  ===== calendar =====
  CALENDAR: (workspaceId: string) => `/workspace/${workspaceId}/calendar`,

  // ===== 파일 조회 =====
  BUILD_DOCUMENT_ROUTE: (workspaceId: string, documentType: FileType, documentId: string) => {
    const routeMapper: Record<FileType, (workspaceId: string, documentId: string) => string> = {
      [FileType.AI_MEETING_MANAGER]: ROUTES.AI_MEETING_MANAGER.MINUTES,
      // TODO: 파일 조회에 연결되는 path 작성해주세요
      [FileType.SNS_EVENT_ASSISTANT]: (workspaceId: string, documentId: string) =>
        `/workspace/${workspaceId}/sns-event-assistant/${documentId}`,
      [FileType.TEAM_MOOD_TRACKER]: (workspaceId: string, documentId: string) =>
        `/workspace/${workspaceId}/team-mood-tracker/${documentId}`,
    };

    return `${routeMapper[documentType](workspaceId, documentId)}`;
  },
} as const;
