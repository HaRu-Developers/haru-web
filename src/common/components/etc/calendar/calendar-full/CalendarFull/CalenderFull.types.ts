import { DocumentFile } from '../../types/calendar.common.types';

export interface CalendarFullProps {
  currentDate: Date;
  documents: DocumentFile[][];
  onCalChange?: (startDate: Date, endDate: Date, currentDate: Date) => void;
  onFileClick?: (id: number) => void;
}
