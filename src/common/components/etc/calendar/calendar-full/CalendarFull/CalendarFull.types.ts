import { DocumentList } from '../../types/calendar.common.types';

export interface CalendarFullProps {
  title: string;
  startDate: Date;
  endDate: Date;
  operatingMonth: number;
  documents: DocumentList[];
  onPrevClick?: () => void;
  onTodayClick?: () => void;
  onNextClick?: () => void;
  onFileClick?: (id: number) => void;
}
