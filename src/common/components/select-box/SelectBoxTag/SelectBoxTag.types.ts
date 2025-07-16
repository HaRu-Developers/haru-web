export interface SelectBoxTagProps {
  label?: string;
  isSelected?: boolean;
  onToggle?: (isSelected: boolean) => void;
  onClick?: () => void;
}
