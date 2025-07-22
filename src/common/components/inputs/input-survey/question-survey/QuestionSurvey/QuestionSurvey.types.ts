import { Type, Visibility } from '../../types/input-survey.common.types';

export interface QuestionSurveyProps {
  type: Type;
  optionList: string[];
  isEtc: boolean;
  visibility?: Visibility;
  description?: string;
  onSubjectBlur?: (value: string) => void;
  onOptionChange?: (updated: string[]) => void;
  onEtcChange?: (value: boolean) => void;
  onDescriptionChange?: (value: string) => void;
  onCheck?: (value: string[]) => void;
}
