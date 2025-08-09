import { FileType } from '@common/types/file-type.enum';

export interface Document {
  documentId: number;
  title: string;
  documentType: FileType;
}

// API 응답의 result.documents 배열에 들어갈 각 문서의 타입
export interface SearchedDocument {
  documentId: string;
  title: string;
  documentType: FileType;
  lastOpened: string;
}

// RequestDto
export interface SearchDocumentsRequestDto {
  workspaceId: string;
  title: string;
}

export interface fetchRecentDocumentsResquestDto {
  workspaceId: number;
}

// ResponseDto
export interface SearchDocumentsResponseDto {
  documents: SearchedDocument[];
}

export interface fetchRecentDocumentsResponseDto {
  documents: Document[];
}
