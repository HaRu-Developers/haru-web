import { Type, Visibility } from '../../common.types';

export interface QuestionOptionsProps {
  optionList?: string[];
  visibility?: Visibility;
  type?: Type;
  onChange?: (index: number, value: string) => void;
  onCheck?: (value: string[]) => void;
}
