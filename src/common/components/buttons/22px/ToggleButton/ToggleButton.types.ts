export interface ToggleButtonProps {
  onLabel?: string;
  offLabel?: string;
  initialState?: boolean;
  className?: string; // Optional className for additional styling
  state: boolean; // 현재 상태를 나타내는 boolean 값
  onToggle: () => void;
}
