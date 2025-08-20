import { InputSurveyQuestionType } from '../../types/input-survey.common.types';

export interface AddQuestionProps {
  // 질문 타입 입니다.
  type?: InputSurveyQuestionType;
  // 옵션 추가 버튼 클릭에 대한 핸들러 입니다.
  onOptionAddClick?: () => void;
  /**
   * @deprecated BE에서 구현하기 전까지는 사용하지 않습니다.
   *
   * '또는 기타 추가' 클릭에 대한 핸들러 입니다.
   */
  onEtcAddClick?: () => void;
  /**
   * @deprecated BE에서 구현하기 전까지는 사용하지 않습니다.
   *
   * 질문이 기존에 이미 기타 선택지를 가지고 있는지 여부를 나타냅니다.
   */
  isQuestionHaveEtcChoice?: boolean;
}
