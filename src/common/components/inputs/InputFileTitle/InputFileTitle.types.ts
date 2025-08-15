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
  onRequestEdit?: () => void; // 읽기모드에서 클릭 시 편집모드 요청(부모가 setEditing(true) 수행)
  noPadding?: boolean;
  isLoading?: boolean;
  editingScopeRef?: React.RefObject<HTMLDivElement>;
}
