import { ProceedingSection } from '@features/ai-meeting-manager/types/proceeding.types';

export interface ProceedingEditorProps {
  value: string; // 부모(Panel)에서 내려주는 raw(draft)
  onChange?: (raw: string, sections: ProceedingSection[]) => void;
  editingScopeRef?: React.RefObject<HTMLElement | null>;
  disabled?: boolean;
}
