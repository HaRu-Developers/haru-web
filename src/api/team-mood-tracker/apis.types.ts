import { SurveyQuestionType } from '../../features/team-mood-tracker/constants/question.constants';

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

/**
 * 분위기 트래커 제목 수정 요청 DTO
 */
export interface ModifyMoodTrackerTitleRequestDto extends MoodTrackerPathParamsDto {
  /** 새롭게 수정할 제목 */
  title: string;
}

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
      type: SurveyQuestionType.MULTIPLE_CHOICE;
      /** 객관식 응답 목록 */
      mulipleChoiceResponseList: SurveyMultipleChoiceItem[];
    })
  | (BaseQuestion & {
      /** 질문 유형: 복수선택 */
      type: SurveyQuestionType.CHECKBOX_CHOICE;
      /** 복수선택 응답 목록 */
      checkboxChoiceResponseList: SurveyCheckboxChoiceItem[];
    })
  | (BaseQuestion & {
      /** 질문 유형: 주관식 */
      type: SurveyQuestionType.SUBJECTIVE;
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
