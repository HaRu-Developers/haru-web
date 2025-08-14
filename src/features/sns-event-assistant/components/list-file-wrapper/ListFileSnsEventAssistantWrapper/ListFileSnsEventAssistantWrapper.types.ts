export interface ListFileSnsEventAssistantWrapperProps {
  checkedList: string[];
  onCheckModeToggle?: (isCheckMode: boolean) => void;
  onCheckedListToggle?: (id: string[]) => void;
}
