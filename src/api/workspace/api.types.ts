import { FileType } from '@common/types/file-type.enum';

export interface Document {
  documentId: number;
  title: string;
  documentType: FileType;
}

export interface fetchRecentDocumentsResquestDto {
  workspaceId: number;
}

export interface fetchRecentDocumentsResponseDto {
  documents: Document[];
}

export interface CalendarDocument extends Document {
  createdAt: string;
}

export interface fetchCalendarResquestDto {
  workspaceId: number;
  start: Date;
  end: Date;
}

export interface fetchCalendarResponseDto {
  documentList: CalendarDocument[];
}
