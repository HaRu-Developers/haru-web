import { SurveySituation } from '../types/input-survey.common.types';

export interface InputSurveyQuestionTitleProps {
  title?: string;
  placeholder?: string;
  visibility?: SurveySituation;
  onChange?: (value: string) => void;
  className?: string;
}
