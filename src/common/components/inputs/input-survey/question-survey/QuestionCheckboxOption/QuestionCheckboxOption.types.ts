import { Visibility } from '../../types/input-survey.common.types';

export interface QuestionCheckboxOptionProps {
  index: number;
  option: string;
  visibility?: Visibility;
  isChecked: boolean;
  onChange?: (index: number, value: string) => void;
  onCheck?: (index: number) => void;
}
