import { ButtonsCommonProps } from '@common/components/buttons/types/buttons.common.types';

export interface CopyButtonProps extends ButtonsCommonProps {
  link?: string;
  onClick?: () => void;
  isHoverable?: boolean;
  className?: string;
}
