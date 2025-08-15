import { InputSurveyQuestionType, SurveyVisibility } from '../types/input-survey.common.types';

/**
 * InputSurveyProps 인터페이스는 설문조사 문항의 속성을 정의합니다.
 *
 * @interface InputSurveyProps
 * @property {string} [title] - 문항의 제목. visibility에 따라 readonly로 변할 수 있습니다.
 * @property {string} [placeholder] - 문항의 제목을 입력하세요. 기본 설정으로 사용됩니다.
 * @property {SurveyVisibility} [visibility] - 문항 생성 시 = PRIVATE, 일반인 설문 시 = PUBLIC.
 * @property {InputSurveyQuestionType} type - 문항의 유형. CHOICE, CHECKBOX, SUBJECT 중 하나를 선택합니다.
 * @property {string[]} options - 문항의 옵션 목록.
 * @property {boolean} [isMandatory] - 문항이 필수인지 여부를 나타냅니다.
 * @property {boolean} [isEtc] - 기타 옵션이 있는지 여부를 나타냅니다.
 * @property {string} [description] - 주관식 문항에 대한 설명입니다.
 * @property {(value: string) => void} [onTitleChange] - 제목 변경 이벤트 핸들러.
 * @property {() => void} [onMovingBarClick] - 이동바 클릭 이벤트 핸들러.
 * @property {(value: InputSurveyQuestionType) => void} [onTypeChange] - 문항 유형 변경 이벤트 핸들러.
 * @property {() => void} [onToggle] - 필수 여부 토글 이벤트 핸들러.
 * @property {() => void} [onDelete] - 문항 삭제 이벤트 핸들러.
 * @property {(value: string[]) => void} [onOptionChange] - 옵션 변경 이벤트 핸들러.
 * @property {(value: string) => void} [onDescriptionChange] - 주관식 문항 설명 변경 이벤트 핸들러.
 * @property {(value: boolean) => void} [onEtcChange] - 기타 옵션 변경 이벤트 핸들러.
 * @property {(value: string[]) => void} [onCheck] - 체크박스 선택 이벤트 핸들러.
 */
export interface InputSurveyProps {
  title: string; // 제목 visibility에 따라 readonly로 변함
  placeholder?: string; // 문항의 제목을 입력하세요.가 될 예정 기본 설정
  visibility?: SurveyVisibility; // PUBLIC, PRIVATE 벡엔드에서 관리
  type: InputSurveyQuestionType; // select-box에서 가져옴 - CHOICE, CHECKBOX, SUBJECT
  options: string[]; // 벡엔드에서는 배열만 넘겨줌 -> 마지막이고 string 값이 일단 기타로 생각하고 제작
  isMandatory?: boolean; // 필수적인지 아닌지
  isEtc?: boolean; // 기타 옵션이 있는지 여부 - 상위에서 기타 있는 지 확인해야함
  description?: string; // 주관식 문항에 대한 내용
  onTitleChange?: (value: string) => void; // 제목 변경 이벤트 -> 넘겨주기만 함
  onMovingBarClick?: () => void; // 이동바 클릭 이벤트 -> 넘겨주기만 함
  onTypeChange?: (value: InputSurveyQuestionType) => void; // select-box에서 타입 변경 이벤트 -> 넘겨주기만 함
  onToggle?: () => void; // 필수 여부 토글 이벤트
  onDelete?: () => void; // 삭제 이벤트
  onOptionChange?: (value: string[]) => void; // 옵션 변경 이벤트
  onDescriptionChange?: (value: string) => void; // 주관식 문항 설명 변경 이벤트
  onEtcChange?: (value: boolean) => void; // 기타 옵션 변경 이벤트
  onCheck?: (value: string[]) => void; // 체크박스 선택 이벤트
}
