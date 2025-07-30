import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum ChangePasswordButtonState {
  COLOR_PRIMARY = 'primary',
  COLOR_WHITE = 'white',
}
export interface ChangePasswordButtonProps extends ButtonsCommonProps {
  state: ChangePasswordButtonState;
}
