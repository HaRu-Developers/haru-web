import { FileType } from '../file-type.enum';

export interface Document {
  documentId: number;
  title: string;
  documentType: FileType;
}

export interface fetchRecentDocumentsResquestDto {
  workspaceId: number | null;
}

export interface fetchRecentDocumentsResponseDto {
  documents: Document[];
}
