import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum MoveToNextButtonWidth {
  WIDTH_414 = '414px',
  WIDTH_260 = '260px',
}
export interface MoveToNextButtonProps extends ButtonsCommonProps {
  width: MoveToNextButtonWidth;
}
