import { InputSurveyQuestionType, SurveyVisibility } from '../../types/input-survey.common.types';

export interface QuestionSurveyProps {
  type: InputSurveyQuestionType;
  optionList: string[];
  isEtc: boolean;
  visibility?: SurveyVisibility;
  description?: string;
  onSubjectBlur?: (value: string) => void;
  onOptionChange?: (updated: string[]) => void;
  onEtcChange?: (value: boolean) => void;
  onDescriptionChange?: (value: string) => void;
  onCheck?: (value: string[]) => void;
}
