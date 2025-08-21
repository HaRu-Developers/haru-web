import { FileType } from '@common/types/file-type.enum';

import { TermsType } from '@common/components/modals/terms/TermsModal.types';

import { CreateNewTeamMoodTrackerModalOnNextStepProps } from '@features/team-mood-tracker/components/modals/CreateNewTeamMoodTrackerModal/CreateNewTeamMoodTrackerModal.types';

// TODO : BE와 협의 끝나면 제거하여야 함
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
  LANDING: '/landing',
  WORKSPACE_MAIN: (workspaceId?: BigintString) => `/workspace/${workspaceId ?? ''}`,
  DOCUMENT_DELETE_CONFIRMED: (workspaceId: string, fileType: FileType) => {
    if (fileType === FileType.TEAM_MOOD_TRACKER) {
      return `/workspace/${workspaceId}/team-mood-tracker?deleteConfirmed=true`;
    }
  },
  // ===== ai-meeting-manager 관련 =====
  AI_MEETING_MANAGER: {
    BASE: (workspaceId: BigintString) => `/workspace/${workspaceId}/ai-meeting-manager`,
    // 회의 단일 조회
    MEETING: (workspaceId: string, meetingId: string) =>
      `/workspace/${workspaceId}/ai-meeting-manager/${meetingId}/meeting`,
    // 회의록 단일 조회
    MINUTES: (workspaceId: string, meetingId: string) =>
      `/workspace/${workspaceId}/ai-meeting-manager/${meetingId}/minutes`,
  },
  //  ===== sns event assistant 관련 =====
  SNS_EVENT_ASSISTANT: {
    MAIN: (workspaceId: BigintString) => `/workspace/${workspaceId}/sns-event-assistant`,
    DETAIL: (workspaceId: string, snsEventId: string, type?: string) =>
      `/workspace/${workspaceId}/sns-event-assistant/${snsEventId}${type ? `?type=${type}` : ''}`,
    CREATE: (workspaceId: string) => `/workspace/${workspaceId}/sns-event-assistant/creating-event`,
    DELETE: (workspaceId: string) => `/workspace/${workspaceId}/sns-event-assistant/delete`,
    DOWNLOAD: (workspaceId: string, snsEventId: string, type?: string) =>
      `/workspace/${workspaceId}/sns-event-assistant/${snsEventId}/download${type ? `?type=${type}` : ''}`,
  },
  TEAM_MOOD_TRACKER: {
    MAIN: (workspaceId: BigintString) => `/workspace/${workspaceId}/team-mood-tracker`,
    DOCUMENT_PREFIX: (workspaceId: BigintString) =>
      `/workspace/${workspaceId}/team-mood-tracker/survey`,
    CREATE_SURVEY: (
      workspaceId: BigintString,
      data: CreateNewTeamMoodTrackerModalOnNextStepProps,
    ) =>
      `/workspace/${workspaceId}/team-mood-tracker/create?title=${data.title}&description=${data.description}&dueDate=${data.dueDate.toISOString()}&visibility=${data.visibility}`,
    PARTICIPATE_SURVEY: (moodTrackerHashedId: string) => `/survey/${moodTrackerHashedId}`,
  },
  CALENDAR: (workspaceId: BigintString) => `/workspace/${workspaceId}/calendar`,

  // 각 문서 타입에 따른 상세 경로를 생성하는 함수 맵(Map)
  DETAIL_DOCUMENTS_DEFAULT: {
    [FileType.AI_MEETING_MANAGER]: (workspaceId: BigintString, documentId: BigintString) =>
      `/workspace/${workspaceId}/ai-meeting-manager/${documentId}/minutes`,

    [FileType.SNS_EVENT_ASSISTANT]: (workspaceId: BigintString, documentId: BigintString) =>
      `/workspace/${workspaceId}/sns-event-assistant/${documentId}?type=participant`,

    [FileType.TEAM_MOOD_TRACKER]: (
      workspaceId: BigintString,
      documentId: BigintString,
      documentType = 'TEAM_MOOD_REPORT',
    ) => `/workspace/${workspaceId}/team-mood-tracker/survey/${documentId}?type=${documentType}`,
  },

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    GOOGLE_OAUTH: '/auth/login/google/callback',
  },

  // ===== 404 페이지 =====
  NOT_FOUND: '/404', // 실제로 없는 주소

  MODAL: {
    GENERAL: {
      CONFIRM_DELETE: (workspaceId: string, fileType?: string, redirectUrlOnConfirm?: string) => {
        const params = [];
        if (fileType) params.push(`fileType=${fileType}`);
        if (redirectUrlOnConfirm) params.push(`redirect=${redirectUrlOnConfirm}`);
        return `/workspace/${workspaceId}/confirm-delete${params.length ? `?${params.join('&')}` : ''}`;
      },
    },
    AUTH: {
      AFTER_REGISTER: {
        INVITED_REGISTER: '/auth/after-register?invited=true',
        NORMAL_REGISTER: '/auth/after-register?invited=false',
      },
    },
    SNS_EVENT_ASSISTANT: {
      CREATE_EVENT: (workspaceId: string) =>
        `/workspace/${workspaceId}/sns-event-assistant/new-event`,
    },
    AI_MEETING_MANAGER: {
      // 회의 생성 모달
      CREATE: (workspaceId: string) => `/workspace/${workspaceId}/ai-meeting-manager/create`,
      // 단일 회의 삭제 확인 모달
      CONFIRM_DELETE: (workspaceId: string) =>
        `/workspace/${workspaceId}/ai-meeting-manager/confirm-delete`,
      // 회의록 다운로드 모달
      DOWNLOAD: (workspaceId: string, meetingId: string) =>
        `/workspace/${workspaceId}/ai-meeting-manager/${meetingId}/minutes/download`,
    },
    TEAM_MOOD_TRACKER: {
      CREATE_SURVEY: (workspaceId: BigintString) =>
        `/workspace/${workspaceId}/team-mood-tracker/create-new-survey`,
      REQUEST_SURVEY_CREATION: (workspaceId: BigintString) =>
        `/workspace/${workspaceId}/team-mood-tracker/request-survey-creation`,
      SURVEY_CREATED: (workspaceId: BigintString, moodTrackerHashedId: string) =>
        `/workspace/${workspaceId}/team-mood-tracker/survey-created?moodTrackerHashedId=${moodTrackerHashedId}`,
    },
    SETTING: {
      BASE: (workspaceId: BigintString) => {
        return `/workspace/${workspaceId}/settings`;
      },
      WORKSPACE_SETTING: (workspaceId: BigintString) =>
        `/workspace/${workspaceId}/settings?tab=workspace`,
      PROFILE_SETTING: (workspaceId: BigintString) =>
        `/workspace/${workspaceId}/settings?tab=profile`,
      INSTAGRAM_CALLBACK: () => `/workspace/instagram-callback`,
      PASSWORD_CHANGE: (workspaceId: BigintString) => {
        return `/workspace/${workspaceId}/settings/change-password`;
      },
    },
    TERMS: {
      PRIVACY: `/terms?type=${TermsType.PRIVACY}`,
      SERVICE: `/terms?type=${TermsType.SERVICE}`,
      MARKETING: `/terms?type=${TermsType.MARKETING}`,
    },
  },
} as const;
