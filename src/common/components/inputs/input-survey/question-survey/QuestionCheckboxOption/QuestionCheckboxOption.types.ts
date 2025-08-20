import { SurveySituation } from '../../types/input-survey.common.types';

export interface QuestionCheckboxOptionProps {
  // 질문의 index 입니다.
  questionIndex: number;
  // 선택지 이름입니다.
  optionName: string;
  // 컴포넌트 사용 상황에 따른 구분입니다. 자세한건 SurveySituation를 참고하세요.
  surveyComponentUsingSituation?: SurveySituation;
  // 체크박스가 선택되었는지 여부입니다.
  isCheckboxChecked: boolean;
  // 선택지 이름 변경 이벤트 핸들러입니다.
  onOptionNameChange?: (index: number, value: string) => void;
  // 체크박스 클릭 이벤트 핸들러입니다.
  onCheckboxClick?: (index: number) => void;
}
