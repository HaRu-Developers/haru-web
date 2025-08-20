import { SurveySituation } from '../../types/input-survey.common.types';

export interface QuestionChoiceOptionProps {
  index: number;
  option: string;
  visibility?: SurveySituation;
  isSelected?: boolean;
  onOptionNameChange?: (index: number, value: string) => void;
  onCheck?: (index: number) => void;
}
