import { InputSurveyQuestionType } from '../types/input-survey.common.types';

/**
 * InputSurveyProps 인터페이스는 설문조사 문항의 속성을 정의합니다.
 */
export interface InputSurveyQuestionProps {
  // 해당 질문의 고유한 ID입니다. 설문 생성 시에는 UUID로 부여되며, API Response의 경우 해당 값 내의 ID를 사용합니다.
  questionId: string;
}

export interface InputSurveyQuestionHandlers {
  // 제목 변경에 따른 이벤트 핸들러 입니다.
  onQuestionTitleChange?: (value: string) => void;
  // 상단의 이동바 클릭 이벤트 핸들러 입니다.
  onTopMovingBarClick?: () => void;
  // 질문 타입 변경에 따른 이벤트 핸들러입니다. select-box에서 타입 변경 이벤트 -> 넘겨주기만 함
  onQuestionTypeChange?: (value: InputSurveyQuestionType) => void;
  // 필수 여부 토글 이벤트
  onIsMandatoryToggle?: () => void;
  // 삭제 이벤트
  onQuestionDelete?: () => void;
  // 옵션 변경 이벤트
  onOptionListChange?: (value: string[]) => void;
  // 주관식 문항 답변 변경 이벤트
  onSubjectiveQuestionResponseChange?: (value: string) => void;
  // 다지선다에서 클릭된 옵션들에 대한 index를 반환합니다.
  onQuestionOptionCheck?: (indexList: number[]) => void;
  // @deprecated - 기타 옵션 변경 이벤트, BE 미구현으로 주석 처리
  // onEtcChange?: (value: boolean) => void;
}
