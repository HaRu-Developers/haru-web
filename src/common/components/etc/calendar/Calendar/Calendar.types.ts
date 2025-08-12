import { DocumentList } from '../types/calendar.common.types';

export interface CalendarProps {
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  operatingMonth: number; // 강조 할 월 - 옆으로 넘어 갈 경우 +-1 하게 줄 것
  documents: DocumentList[];
  onFileClick?: (id: number) => void; // 파일 클릭 이벤트 핸들러
}
