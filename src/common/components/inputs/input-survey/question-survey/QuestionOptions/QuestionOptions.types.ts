import { InputSurveyQuestionType, SurveyVisibility } from '../../types/input-survey.common.types';

export interface QuestionOptionsProps {
  optionList?: string[];
  visibility?: SurveyVisibility;
  type?: InputSurveyQuestionType;
  onChange?: (index: number, value: string) => void;
  onCheck?: (value: string[]) => void;
}
