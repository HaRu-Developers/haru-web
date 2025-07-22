export interface Option {
  state: string;
  label: string;
}

export interface SelectBoxOptionProps {
  options: Option[];
  initState: string;
  onClick: (value: string) => void;
  placeholder?: string;
  className?: string;
}
