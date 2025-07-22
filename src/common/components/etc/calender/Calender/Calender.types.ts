import { DocumentFile } from '../types/calender.common.types';

export interface CalendarProps {
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  operatingMonth: number; // 강조 할 월 - 옆으로 넘어 갈 경우 +-1 하게 줄 것
  documents: DocumentFile[][]; //여러 날짜의 여려 문서라 배열 두 개
  onFileClick?: (id: number) => void; // 파일 클릭 이벤트 핸들러
}
