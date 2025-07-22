import { DocumentFile } from '../types/calender.common.types';

export interface DocumentFileProps {
  file: DocumentFile;
  onClick?: (id: number) => void; // 경로 이동을 위한 클릭 일단 id 값 넘겨주기
}
