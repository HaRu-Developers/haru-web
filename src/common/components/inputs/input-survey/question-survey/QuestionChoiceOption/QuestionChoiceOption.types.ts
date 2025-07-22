import { Visibility } from '../../types/input-survey.common.types';

export interface QuestionChoiceOptionProps {
  index: number;
  option: string;
  visibility?: Visibility;
  isSelected?: boolean;
  onChange?: (index: number, value: string) => void;
  onCheck?: (index: number) => void;
}
