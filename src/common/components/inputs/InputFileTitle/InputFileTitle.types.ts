export enum InputFileTitleMode {
  DEFAULT = 'DEFAULT',
  HOVER = 'HOVER',
  EDITABLE = 'EDITABLE',
}

export interface InputFileTitleProps {
  mode?: InputFileTitleMode;
  value: string;
  onSave?: (newValue: string) => void;
  onCancel?: () => void;
  onClick?: () => void;
  onMode?: (mode: InputFileTitleMode) => void;
}
