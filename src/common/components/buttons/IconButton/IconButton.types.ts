import { ReactNode } from 'react';

export interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
}
