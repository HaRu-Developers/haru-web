import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum CancelButtonType {
  SIZE_32 = 'SIZE_32',
  SIZE_38 = 'SIZE_38',
}
export interface CancelButtonProps extends ButtonsCommonProps {
  buttonType: CancelButtonType;
}
