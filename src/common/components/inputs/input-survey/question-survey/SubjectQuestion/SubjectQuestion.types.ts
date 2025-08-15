import { SurveyVisibility } from '../../types/input-survey.common.types';

export interface SubjectQuestionProps {
  description?: string;
  visibility: SurveyVisibility;
  onChange?: (value: string) => void;
}
