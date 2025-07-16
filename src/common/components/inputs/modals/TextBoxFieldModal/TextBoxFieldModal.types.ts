export interface TextBoxFieldModalProps {
  title: string;
  placeholder: string;
  value: string;
  type?: string; // Optional type for the input field, default is "text"
  onChange: (value: string) => void;
}
