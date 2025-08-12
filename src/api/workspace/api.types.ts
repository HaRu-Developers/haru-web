import { FileType } from '@common/types/file-type.enum';

import { DocumentList } from '@common/components/etc/calendar/types/calendar.common.types';

export interface Document {
  documentId: string;
  title: string;
  documentType: FileType;
}

export interface fetchRecentDocumentsResquestDto {
  workspaceId: string;
}

export interface fetchRecentDocumentsResponseDto {
  documents: Document[];
}

export interface fetchCalendarResquestDto {
  workspaceId: number;
  start: Date;
  end: Date;
}

export interface fetchCalendarResponseDto {
  documentList: DocumentList[];
}
