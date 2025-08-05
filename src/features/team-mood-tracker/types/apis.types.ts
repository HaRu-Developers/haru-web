import { SurveyQuestionType } from '../constants/question.constants';

// Request DTO
export interface GetViewSurveyRequestDto {
  moodTrackerHashedId: string;
}

export interface GetViewReportRequestDto {
  moodTrackerHashedId: string;
}

// Response DTO

// 모든 질문의 기본 구조
interface BaseQuestion {
  questionId: string;
  questionTitle: string;
}

// 객관식 응답 항목
export interface SurveyMultipleChoiceItem {
  multipleChoiceId: string;
  content: string;
  selectedNum: number;
}

// 복수선택 응답 항목
export interface SurveyCheckboxChoiceItem {
  checkboxChoiceId: string;
  content: string;
  selectedNum: number;
}

// 질문 유형에 따라 상세 구조가 달라지는 질문 객체 타입
export type SurveyQuestion =
  | (BaseQuestion & {
      type: SurveyQuestionType.MULTIPLE_CHOICE;
      mulipleChoiceResponseList: SurveyMultipleChoiceItem[];
    })
  | (BaseQuestion & {
      type: SurveyQuestionType.CHECKBOX_CHOICE;
      checkboxChoiceResponseList: SurveyCheckboxChoiceItem[];
    })
  | (BaseQuestion & {
      type: SurveyQuestionType.SUBJECTIVE;
      subjectiveResponseList: string[];
    });

// 최종 API 응답 Dto
export interface GetViewSurveyResponseDto {
  moodTrackerHashedId: string;
  title: string;
  creatorId: string;
  creatorName: string;
  updatedAt: string;
  dueDate: string;
  respondentsNum: number;
  responseList: SurveyQuestion[];
}

export interface GetViewReportResponseDto {
  moodTrackerHashedId: string;
  title: string;
  creatorId: string;
  creatorName: string;
  updatedAt: string;
  dueDate: string;
  respondentsNum: number;
  suggestionList: string[];
  report: string;
}
