import { InputSurveyQuestionType } from '../../types/input-survey.common.types';

export interface AddQuestionProps {
  type?: InputSurveyQuestionType;
  onOptionAddClick?: () => void;
  onEtcAddClick?: () => void;
  isEtc?: boolean;
}
