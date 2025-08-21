import React from 'react';

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
  isLoading?: boolean;
  editingScopeRef?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;
  onMode?: (mode: InputFileTitleMode) => void;
  commitTick?: number; // 저장 신호 (증가할 때만 반응)
  cancelTick?: number; // 취소 신호 (증가할 때만 반응)
  isProceedingTab?: boolean;
}
