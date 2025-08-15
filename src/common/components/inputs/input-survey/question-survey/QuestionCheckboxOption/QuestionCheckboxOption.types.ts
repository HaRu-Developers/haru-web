import { SurveyVisibility } from '../../types/input-survey.common.types';

export interface QuestionCheckboxOptionProps {
  index: number;
  option: string;
  visibility?: SurveyVisibility;
  isChecked: boolean;
  onChange?: (index: number, value: string) => void;
  onCheck?: (index: number) => void;
}
