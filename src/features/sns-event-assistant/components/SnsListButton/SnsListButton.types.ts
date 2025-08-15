import { ButtonsCommonProps } from "@common/components/buttons/types/buttons.common.types";

export interface SnsListButtonProps extends ButtonsCommonProps {
  value: string;
  isToggle: boolean;
  num?: number;
  onClick?: () => void;
}