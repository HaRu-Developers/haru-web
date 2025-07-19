import { Type } from '../../common.types';

export interface AddQuestionProps {
  type?: Type;
  onOptionAddClick?: () => void;
  onEtcAddClick?: () => void;
  isEtc?: boolean;
}
