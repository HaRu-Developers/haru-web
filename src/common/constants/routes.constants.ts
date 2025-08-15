import { FileType } from '@common/types/file-type.enum';

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
  ONBOARDING: '/onboarding',
  ROOT: '/',

  WORKSPACE_MAIN: (workspaceId?: BigintString) => `/workspace/${workspaceId ?? ''}`,
  AI_MEETING_MANAGER: (workspaceId: BigintString) => `/workspace/${workspaceId}/ai-meeting-manager`,
  SNS_EVENT_ASSISTANT: (workspaceId: BigintString) =>
    `/workspace/${workspaceId}/sns-event-assistant`,
  TEAM_MOOD_TRACKER: {
    MAIN: (workspaceId: BigintString) => `/workspace/${workspaceId}/team-mood-tracker`,
    DOCUMENT_PREFIX: (workspaceId: BigintString) =>
      `/workspace/${workspaceId}/team-mood-tracker/survey`,
    CREATE_SURVEY: (
      workspaceId: BigintString,
      data: CreateNewTeamMoodTrackerModalOnNextStepProps,
    ) =>
      `/workspace/${workspaceId}/team-mood-tracker/create?title=${data.title}&description=${data.description}&dueDate=${data.dueDate.toISOString()}&visibility=${data.visibility}`,
  },
  CALENDAR: (workspaceId: BigintString) => `/workspace/${workspaceId}/calendar`,

  // 파일 조회
  BUILD_DOCUMENT_ROUTE: (
    workspaceId: BigintString,
    documentType: FileType,
    documentId: BigintString,
  ) => {
    const routeMapper: Record<FileType, (workspaceId: BigintString) => string> = {
      [FileType.AI_MEETING_MANAGER]: ROUTES.AI_MEETING_MANAGER,
      [FileType.SNS_EVENT_ASSISTANT]: ROUTES.SNS_EVENT_ASSISTANT,
      [FileType.TEAM_MOOD_TRACKER]: ROUTES.TEAM_MOOD_TRACKER.DOCUMENT_PREFIX,
    };

    return `${routeMapper[documentType](workspaceId)}/${documentId}`;
  },

  DETAIL_DOCUMENTS_DEFAULT: {
    // 각 문서 타입에 따른 상세 경로를 생성하는 함수 맵(Map)
    [FileType.AI_MEETING_MANAGER]: (workspaceId: BigintString, documentId: BigintString) =>
      `/workspace/${workspaceId}/ai-meeting-manager/${documentId}/minutes`,

    [FileType.SNS_EVENT_ASSISTANT]: (workspaceId: BigintString, documentId: BigintString) =>
      `/workspace/${workspaceId}/sns-event-assistant/${documentId}?type=participant`,

    [FileType.TEAM_MOOD_TRACKER]: (workspaceId: BigintString, documentId: BigintString) =>
      `/workspace/${workspaceId}/team-mood-tracker/survey/${documentId}?type=TEAM_MOOD_REPORT`,
  },

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    GOOGLE_OAUTH: '/auth/login/google/callback',
  },

  MODAL: {
    AUTH: {
      AFTER_REGISTER: {
        INVITED_REGISTER: '/auth/after-register?invited=true',
        NORMAL_REGISTER: '/auth/after-register?invited=false',
      },
    },
    AI_MEETING_MANAGER: {},
    SNS_EVENT_ASSISTANT: {},
    TEAM_MOOD_TRACKER: {
      CREATE_SURVEY: (workspaceId: BigintString) =>
        `/workspace/${workspaceId}/team-mood-tracker/create-new-survey`,
      REQUEST_SURVEY_CREATION: (workspaceId: BigintString) =>
        `/workspace/${workspaceId}/team-mood-tracker/request-survey-creation`,
      SURVEY_CREATED: (workspaceId: BigintString, moodTrackerHashedId: string) =>
        `/workspace/${workspaceId}/team-mood-tracker/survey-created?moodTrackerHashedId=${moodTrackerHashedId}`,
    },
  },
} as const;
