import { FileType } from '@common/types/file-type.enum';

import { TermsModalType } from '@common/components/modals/terms/TermsModal.types';

/**
 * BE측에서 string으로 변환하여 주는 Bigint (JAVA long type) 에 대응하는 타입입니다.
 *
 * string으로의 이관이 완전히 끝나면 string만 남기도록 합니다.
 *
 * (TS는 덕타입이라 오류 발생하지 않습니다)
 */
export type BigintString = string | number | bigint | null;

export const ROUTES = {
  // ===== onboarding 관련 =====
  ONBOARDING: '/onboarding',
  // ===== main 관련 =====
  ROOT: '/',
  WORKSPACE_MAIN: (workspaceId?: BigintString) => `/workspace/${workspaceId ?? ''}`,
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
    BASE: (workspaceId: BigintString) => `/workspace/${workspaceId}/ai-meeting-manager`,
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
  SNS_EVENT_ASSISTANT: (workspaceId: BigintString) =>
    `/workspace/${workspaceId}/sns-event-assistant`,
  //  ===== team mood tracker 관련 =====
  TEAM_MOOD_TRACKER: (workspaceId: BigintString) => `/workspace/${workspaceId}/team-mood-tracker`,
  //  ===== calendar =====
  CALENDAR: (workspaceId: BigintString) => `/workspace/${workspaceId}/calendar`,
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

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    GOOGLE_OAUTH: '/auth/login/google/callback',
  },

  NOT_FOUND: '/404', // 실제로 없는 주소
} as const;
