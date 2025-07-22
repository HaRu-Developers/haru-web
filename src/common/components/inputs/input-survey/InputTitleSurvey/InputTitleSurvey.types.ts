import { Visibility } from '../types/input-survey.common.types';

export interface InputTitleSurveyProps {
  title?: string;
  placeholder?: string;
  visibility?: Visibility;
  onChange?: (value: string) => void;
  className?: string;
}
