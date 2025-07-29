import { ButtonsCommonProps } from '../../types/buttons.common.types';

export interface NavigateToMainButtonProps extends ButtonsCommonProps {
  disabled: boolean;
  className?: string;
  state: NavigateToMainButtonState;
}
export enum NavigateToMainButtonState {
  WIDTH_260_BLACK = 'w-260pxr',
  WIDTH_214_WHITE = 'w-214pxr',
}
