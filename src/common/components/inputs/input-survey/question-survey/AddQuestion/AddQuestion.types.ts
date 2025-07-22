import { Type } from '../../types/input-survey.common.types';

export interface AddQuestionProps {
  type?: Type;
  onOptionAddClick?: () => void;
  onEtcAddClick?: () => void;
  isEtc?: boolean;
}
