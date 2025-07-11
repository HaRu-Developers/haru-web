import { ButtonsCommonProps } from '../../types/buttons.common.types';

export enum ArrowButtonDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface ArrowButtonProps extends ButtonsCommonProps {
  direction: ArrowButtonDirection;
}
