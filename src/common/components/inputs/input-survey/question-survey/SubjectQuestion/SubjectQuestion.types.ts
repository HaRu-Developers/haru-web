import { Visibility } from '../../types/input-survey.common.types';

export interface SubjectQuestionProps {
  description?: string;
  visibility: Visibility;
  onChange?: (value: string) => void;
}
