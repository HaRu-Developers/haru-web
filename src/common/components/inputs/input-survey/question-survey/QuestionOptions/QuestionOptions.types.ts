import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';

export interface QuestionOptionsProps {
  // 다지선다 질문에 대한 선택지 리스트 입니다.
  optionList?: string[];
  // 컴포넌트 사용 상황에 따른 구분입니다. 자세한건 SurveySituation를 참고하세요.
  surveyComponentUsingSituation?: SurveySituation;
  // 객관식, 체크박스, 주관식 등 질문의 유형입니다.
  questionType?: InputSurveyQuestionType;
  // optionList에 대한 변경, 즉 option명 변경을 처리하는 event handler 입니다.
  onOptionListChange?: (index: number, value: string) => void;
  // 질문 옵션에 대한 체크 이벤트 핸들러입니다.
  onQuestionOptionCheck?: (indexList: number[]) => void;
}
