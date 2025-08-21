import { SurveySituation } from '../../types/input-survey.common.types';

export interface SubjectQuestionProps {
  // 주관식 질문에 대한 답변입니다.
  subjectiveQuestionResponse?: string;
  // 컴포넌트 사용 상황에 따른 구분입니다. 자세한건 SurveySituation를 참고하세요.
  surveyComponentUsingSituation: SurveySituation;
  // 주관식 질문에 대한 답변 변경에 대한 핸들러입니다.
  onSubjectiveQuestionResponseChange?: (value: string) => void;
}
