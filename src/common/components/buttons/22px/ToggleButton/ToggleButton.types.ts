export interface ToggleButtonProps {
  onLabel?: string;
  offLabel?: string;
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}
