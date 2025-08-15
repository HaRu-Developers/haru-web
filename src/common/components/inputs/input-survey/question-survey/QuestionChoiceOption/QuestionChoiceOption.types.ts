import { SurveyVisibility } from '../../types/input-survey.common.types';

export interface QuestionChoiceOptionProps {
  index: number;
  option: string;
  visibility?: SurveyVisibility;
  isSelected?: boolean;
  onChange?: (index: number, value: string) => void;
  onCheck?: (index: number) => void;
}
