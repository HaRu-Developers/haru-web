export interface CalendarSectionProps {
  workspaceId: number;
  currentDate: Date;
  onCalChange: (newCurrentDate: Date) => void;
  onFileClick: (id: number) => void;
}
