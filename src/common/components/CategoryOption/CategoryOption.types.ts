export interface CategoryOptionProps {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
