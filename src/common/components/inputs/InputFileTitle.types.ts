export enum InputFileTitleMode {
  DEFAULT = 'DEFAULT',
  EDITABLE = 'EDITABLE',
}

export interface InputFileTitleProps {
  mode?: InputFileTitleMode;
  value: string;
  onSave?: (newValue: string) => void;
  onCancel?: () => void;
}
