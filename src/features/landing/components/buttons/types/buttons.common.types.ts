import { ButtonHTMLAttributes } from 'react';

export interface ButtonsCommonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: string;
}
