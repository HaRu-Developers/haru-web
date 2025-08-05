import { FileType } from '@common/types/file-type.enum';

// 사이드바 최근 문서 조회
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

// 워크스페이스 리스트 조회
export interface Workspace {
  workspaceId: string;
  title: string;
  imageUrl: string | null;
  isOwner: boolean;
}

export type fetchMyWorkspacesResponseDto = Workspace[];
