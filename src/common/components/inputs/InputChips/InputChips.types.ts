export interface ChipProps {
  chip: string;
}

export interface InputChipsProps {
  inputValue?: string;
  inputChips?: string[];
  placeholder?: string;
  className?: string; // Optional className for additional styling
  onChange?: (value: string) => void;
  onChipsChange?: (chips: string[]) => void;
  onInvite?: (chips: string[]) => void;
}
