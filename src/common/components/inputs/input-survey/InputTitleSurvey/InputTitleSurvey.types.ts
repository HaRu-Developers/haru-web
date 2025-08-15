import { SurveyVisibility } from '../types/input-survey.common.types';

export interface InputTitleSurveyProps {
  title?: string;
  placeholder?: string;
  visibility?: SurveyVisibility;
  onChange?: (value: string) => void;
  className?: string;
}
