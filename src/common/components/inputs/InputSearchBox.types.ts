export interface InputSerchBoxProps {
  mode?: 'default' | 'hover';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
