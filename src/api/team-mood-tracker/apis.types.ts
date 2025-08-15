import { ApiErrorBody } from '@common/types/api.common.types';

import { ApiError } from '@common/errors/ApiError';

import { InputSurveyQuestionType } from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

// Request DTO
// Request DTO
// Request DTO

/**
 * 분위기 트래커 API에서 공통으로 사용하는 Path Parameter를 위한 DTO
 */
export interface MoodTrackerPathParamsDto {
  /** 해싱된 분위기 트래커의 고유 ID */
  moodTrackerHashedId: string;
}

/** 설문 조회 요청 DTO. Path Parameter만 포함합니다. */
export type GetViewSurveyRequestDto = MoodTrackerPathParamsDto;
/** 리포트 조회 요청 DTO. Path Parameter만 포함합니다. */
export type GetViewReportRequestDto = MoodTrackerPathParamsDto;
/** 리포트 생성 요청 DTO. Path Parameter만 포함합니다. */
export type SendMoodTrackLinkToTeammateViaEmailRequestDto = MoodTrackerPathParamsDto;

/**
 * 분위기 트래커 제목 수정 요청 DTO
 */
export interface ModifyMoodTrackerTitleRequestDto extends MoodTrackerPathParamsDto {
  /** 새롭게 수정할 제목 */
  title: string;
}

export interface CreateSurveyQuestion {
  title: string; // 질문의 제목
  type: InputSurveyQuestionType;
  isMandatory: boolean; // 필수 여부
  options?: string[]; // 선택지 목록, SUBJECTIVE일 경우 제공하지 않음.
}

/**
 * 설문 생성 요청 DTO
 * @description 설문 생성 시 필요한 정보를 담고 있는 DTO입니다.
 *
 * @property title - 설문의 제목
 * @property description - 설문의 설명
 * @property dueDate - 설문 마감 일시 (ISO 8601 형식)
 * @property visibility - 설문의 공개 여부
 * @property questions - 설문에 포함될 질문 목록
 */
export interface CreateNewSurveyRequestDto {
  title: string;
  description: string;
  dueDate: string; // ISO 8601 형식의 날짜 문자열
  visibility: 'PUBLIC' | 'PRIVATE'; // 공개 여부
  questions: CreateSurveyQuestion[];
}

// Response DTO
// Response DTO
// Response DTO

/**
 * 분위기 트래커 관련 API 응답의 공통 기본 DTO
 */
export interface BaseMoodTrackerResponseDto {
  /** 해싱된 분위기 트래커의 고유 ID */
  moodTrackerHashedId: string;
  /** 분위기 트래커의 제목 */
  title: string;
  /** 생성자의 고유 ID */
  creatorId: string;
  /** 생성자의 이름 */
  creatorName: string;
  /** 최종 수정 일시 (ISO 8601 형식) */
  updatedAt: string;
  /** 설문 마감 일시 (ISO 8601 형식) */
  dueDate: string;
  /** 현재까지의 응답자 수 */
  respondentsNum: number;
}

/**
 * 모든 질문 유형의 기본 구조
 */
interface BaseQuestion {
  /** 질문의 고유 ID */
  questionId: string;
  /** 질문의 내용 */
  questionTitle: string;
}

/**
 * 객관식 문항의 응답 항목
 */
export interface SurveyMultipleChoiceItem {
  /** 객관식 선택지의 고유 ID */
  multipleChoiceId: string;
  /** 선택지의 내용 */
  content: string;
  /** 해당 항목을 선택한 응답자 수 */
  selectedNum: number;
}

/**
 * 복수선택 문항의 응답 항목
 */
export interface SurveyCheckboxChoiceItem {
  /** 복수선택 선택지의 고유 ID */
  checkboxChoiceId: string;
  /** 선택지의 내용 */
  content: string;
  /** 해당 항목을 선택한 응답자 수 */
  selectedNum: number;
}

/**
 * 질문 유형(type)에 따라 구조가 달라지는 질문 객체 타입 (Discriminated Union)
 */
export type SurveyQuestion =
  | (BaseQuestion & {
      /** 질문 유형: 객관식 */
      type: TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE;
      /** 객관식 응답 목록 */
      multipleChoiceResponseList: SurveyMultipleChoiceItem[];
    })
  | (BaseQuestion & {
      /** 질문 유형: 복수선택 */
      type: TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE;
      /** 복수선택 응답 목록 */
      checkboxChoiceResponseList: SurveyCheckboxChoiceItem[];
    })
  | (BaseQuestion & {
      /** 질문 유형: 주관식 */
      type: TeamMoodTrackerSurveyQuestionType.SUBJECTIVE;
      /** 주관식 응답 목록 */
      subjectiveResponseList: string[];
    });

/**
 * 설문 조회 API의 최종 응답 DTO
 */
export interface GetViewSurveyResponseDto extends BaseMoodTrackerResponseDto {
  /** 질문 및 응답 목록 */
  responseList: SurveyQuestion[];
}

/**
 * 분석 리포트 조회 API의 최종 응답 DTO
 */
export interface GetViewReportResponseDto extends BaseMoodTrackerResponseDto {
  /** AI가 제안하는 해결 방안 목록 */
  suggestionList: string[];
  /** AI가 생성한 분석 리포트 본문 */
  report: string;
}

/**
 * TeamMoodTrackerPageProps는 Next.js 동적 라우팅에서
 * [moodTrackerHashedId] 파라미터를 받는 페이지 컴포넌트의 props 타입입니다.
 *
 * @description
 * Next.js App Router의 스트리밍(Streaming) 및 점진적 렌더링(Progressive Rendering)
 * 기능으로 인해 `params`는 `Promise`일 수 있습니다.
 *
 * 이는 상위 `layout`이 `params` 데이터가 완전히 준비될 때까지 기다리지 않고
 * 먼저 렌더링을 시작하도록 하여 초기 UI 표시 속도를 향상시키는 최적화 전략입니다.
 *
 * 따라서 이 `params`를 사용하는 `async` 서버 컴포넌트에서는
 * `await params`를 통해 값을 비동기적으로 처리해야 합니다.
 *
 * @property params - 라우트 파라미터 객체. 스트리밍 환경에서는 Promise일 수 있습니다.
 * @property params.moodTrackerHashedId - 팀 무드 트래커의 해시된 ID (string)
 */
export interface TeamMoodTrackerPageProps {
  params: { moodTrackerHashedId: string } | Promise<{ moodTrackerHashedId: string }>;
}

/**
 * @description 다운로드 포맷 타입
 */
export enum DownloadFormat {
  PDF = 'PDF',
  DOCX = 'DOCX',
}

/**
 * @description 다운로드 링크 조회 API 요청 시 필요한 파라미터 타입
 */
export interface TeamMoodReportDownloadLinkRequestDto {
  moodTrackerHashedId: string;
  format: DownloadFormat;
}

/**
 * @description 다운로드 링크 조회 API 응답의 result 필드 데이터 형태
 */
export interface TeamMoodReportDownloadLinkResponseDto {
  downloadLink: string;
}

export interface UseTeamMoodDownloadLinkOptions {
  enabled?: boolean;
  onSuccess?: (data: TeamMoodReportDownloadLinkResponseDto) => void;
  onError?: (error: ApiError<ApiErrorBody>) => void;
}

// --- 경운 작업본

export interface CreateNewSurveyResponseDto {
  moodTrackerHashedId: string; // 생성된 설문의 해싱된 ID
}
