import { Document } from '@common/types/document.types';
import { FileType } from '@common/types/file-type.enum';

import { DocumentList } from '@common/components/etc/calendar/types/calendar.common.types';

/**
 * 워크스페이스의 기본 정보 구조
 *
 * @property {string} title - 워크스페이스 제목
 * @property {string | null} imageUrl - 워크스페이스 대표 이미지 URL (없을 경우 null)
 */
export interface BaseWorkspace {
  title: string;
  imageUrl: string | null;
}

/**
 * 워크스페이스 ID를 포함하는 요청 DTO
 *
 * @property {string} workspaceId - 워크스페이스 고유 ID
 */
export interface WorkspaceIdRequestDto {
  workspaceId: string;
}

/**
 * 워크스페이스 수정 요청 DTO
 */
export interface UpdateWorkspaceRequestDto extends WorkspaceIdRequestDto {
  title: string; // 워크스페이스 제목
  image?: File; // 워크스페이스 대표 이미지 (파일 업로드용)
}

/**
 * 워크스페이스 상세 정보
 *
 * @extends BaseWorkspace
 * @property {{ email: string; name: string; }[]} members - 워크스페이스 구성원 목록
 */
export interface WorkspaceDetail extends BaseWorkspace {
  members: {
    email: string;
    name: string;
  }[];
}

/**
 * 워크스페이스 요약 정보 (리스트용)
 *
 * @extends BaseWorkspace
 * @property {string} workspaceId - 워크스페이스 고유 ID
 * @property {boolean} isOwner - 현재 사용자가 해당 워크스페이스의 소유자인지 여부
 */
export interface WorkspaceSummary extends BaseWorkspace {
  workspaceId: string;
  isOwner: boolean;
}

/**
 * 단일 문서 정보
 *
 * 여기서는 createdAt을 안 받음
 *
 * @property {string} documentId - 문서 고유 ID
 * @property {string} title - 문서 제목
 * @property {FileType} documentType - 문서 타입 (예: 폴더, 문서 등)
 */
export type ApiDocument = Omit<Document, 'createdAt'>;

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
  workspaceId: string;
}

// ResponseDto
export interface SearchDocumentsResponseDto {
  documents: SearchedDocument[];
}

/**
 * 최근 문서 목록 응답 DTO
 *
 * @property {ApiDocument[]} documents - 최근 문서 목록
 */
export interface FetchRecentDocumentsResponseDto {
  documents: ApiDocument[];
}

/**
 * 특정 워크스페이스 상세 정보 응답 DTO
 *
 * @typedef {WorkspaceDetail[]} FetchWorkspaceResponseDto
 */
export type FetchWorkspaceDetailResponseDto = WorkspaceDetail;

/**
 * 내 워크스페이스 목록 조회 응답 DTO
 *
 * @typedef {WorkspaceSummary[]} FetchMyWorkspacesResponseDto
 */

export type FetchMyWorkspacesResponseDto = WorkspaceSummary[];

/**
 * 워크스페이스 수정 응답 DTO
 */
export type UpdateWorkspaceResponseDto = WorkspaceDetail;

export interface fetchCalendarResquestDto {
  workspaceId: string;
  start: Date;
  end: Date;
}

export interface fetchCalendarResponseDto {
  documentList: DocumentList[];
}

export interface ViewRecentBoxedFilesRequestDto {
  workspaceId: string;
}

export interface RecentBoxedFile {
  documentId: string;
  title: string;
  documentType: FileType;
  thumbnailUrl: string | null; // 이미지 URL은 없을 수도 있으므로 null 허용
  lastOpened: string;
}

/**
 * @description 최근 항목 (박스 파일) 조회 API 응답의 result 필드 데이터 형태
 */

export interface ViewRecentBoxedFilesResponseDto {
  documents: RecentBoxedFile[];
}
