import { SurveySituation } from '../../types/input-survey.common.types';

export interface QuestionChoiceOptionProps {
  questionIndex: number;
  optionName: string;
  surveyComponentUsingSituation?: SurveySituation;
  isCheckboxSelected?: boolean;
  onOptionNameChange?: (index: number, value: string) => void;
  onCheckboxClick?: (index: number) => void;
}
