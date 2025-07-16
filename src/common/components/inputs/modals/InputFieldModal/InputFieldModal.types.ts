export interface InputFieldModalProps {
  title?: string;
  placeholder: string;
  value: string;
  type?: string; // Optional type for the input field, default is "text"
  onChange: (value: string) => void;
  className?: string; // Optional className for additional styling
}
