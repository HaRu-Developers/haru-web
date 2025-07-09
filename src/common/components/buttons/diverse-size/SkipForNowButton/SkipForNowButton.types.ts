import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum SkipForNowButtonType {
  SIZE_38 = 'SIZE_38',
  SIZE_48 = 'SIZE_48',
}

export interface SkipForNowButtonProps extends ButtonsCommonProps {
  buttonType: SkipForNowButtonType;
}
