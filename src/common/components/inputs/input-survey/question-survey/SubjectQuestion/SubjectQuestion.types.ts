import { Visibility } from '../../common.types';

export interface SubjectQuestionProps {
  description?: string;
  visibility: Visibility;
  onChange?: (value: string) => void;
}
