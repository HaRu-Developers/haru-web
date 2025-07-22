import { ButtonHTMLAttributes } from 'react';

import { ProfileSelectModalMenuState } from '../ProfileSelectModal.types';

export interface ProfileSelectModalMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  menuName: ProfileSelectModalMenuState;
  className?: string;
  isSelected: boolean;
}
