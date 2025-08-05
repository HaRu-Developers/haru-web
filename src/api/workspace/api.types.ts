import { FileType } from '@common/types/file-type.enum';

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
