import { Type, Visibility } from '../types/input-survey.common.types';

export interface InputSurveyProps {
  title?: string; // 제목 visibility에 따라 readonly로 변함
  placeholder?: string; // 문항의 제목을 입력하세요.가 될 예정 기본 설정
  visibility?: Visibility; // PUBLIC, PRIVATE 벡엔드에서 관리
  type: Type; // select-box에서 가져옴 - CHOICE, CHECKBOX, SUBJECT
  optionList: string[]; // 벡엔드에서는 배열만 넘겨줌 -> 마지막이고 string 값이 일단 기타로 생각하고 제작
  isMandatory?: boolean; // 필수적인지 아닌지
  isEtc?: boolean; // 기타 옵션이 있는지 여부 - 상위에서 기타 있는 지 확인해야함
  description?: string; // 주관식 문항에 대한 내용
  onTitleChange?: (value: string) => void; // 제목 변경 이벤트 -> 넘겨주기만 함
  onMovingBarClick?: () => void; // 이동바 클릭 이벤트 -> 넘겨주기만 함
  onTypeChange?: (value: Type) => void; // select-box에서 타입 변경 이벤트 -> 넘겨주기만 함
  onToggle?: () => void; // 필수 여부 토글 이벤트
  onDelete?: () => void; // 삭제 이벤트
  onOptionChange?: (value: string[]) => void; // 옵션 변경 이벤트
  onDescriptionChange?: (value: string) => void; // 주관식 문항 설명 변경 이벤트
  onEtcChange?: (value: boolean) => void; // 기타 옵션 변경 이벤트
  onCheck?: (value: string[]) => void; // 체크박스 선택 이벤트
}
