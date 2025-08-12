import { DocumentList } from '../types/calendar.common.types';

export interface DocumentFileProps {
  file: DocumentList;
  onClick?: (id: number) => void; // 경로 이동을 위한 클릭 일단 id 값 넘겨주기
}
