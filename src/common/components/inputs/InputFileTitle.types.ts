export interface InputFileTitleProps {
  mode?: 'default' | 'hover' | 'editable';
  value: string;
  onSave?: (newValue: string) => void;
  onCancel?: () => void;
}
