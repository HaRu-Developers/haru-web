import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';

export interface QuestionSurveyProps {
  // 질문의 타입입니다.
  questionType: InputSurveyQuestionType;
  // 선택지 목록입니다.
  optionList: string[];
  // 컴포넌트 사용 상황에 따른 구분입니다. 자세한건 SurveySituation를 참고하세요.
  surveyComponentUsingSituation?: SurveySituation;
  // 주관식 질문에 대한 답변입니다.
  subjectiveQuestionResponse?: string;
  // 선택지 목록 변경에 대한 핸들러 입니다.
  onOptionListChange?: (updated: string[]) => void;
  onSubjectiveQuestionResponseChange?: (value: string) => void;
  // 질문 옵션에 대한 체크 이벤트 핸들러입니다.
  onQuestionOptionCheck?: (indexList: number[]) => void;
  /**
   * 기타 선택지가 있는지 여부입니다.
   * @deprecated
   */
  // isQuestionHaveEtcChoice: boolean;
  /**
   * 기타 선택지 변경에 대한 핸들러 입니다.
   * @deprecated
   */
  // onEtcChange?: (value: boolean) => void;
  // 주관식 질문에 대한 답변 변경에 대한 핸들러입니다.
}
