export interface Option {
  state: string;
  label: string;
}

export interface SelectBoxProps {
  options: Option[];
  initState: string;
  onClick: (value: string) => void;
  placeholder?: string;
}
