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
 * @property {string} documentId - 문서 고유 ID
 * @property {string} title - 문서 제목
 * @property {FileType} documentType - 문서 타입 (예: 폴더, 문서 등)
 */
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

/**
 * 최근 문서 목록 응답 DTO
 *
 * @property {Document[]} documents - 최근 문서 목록
 */
export interface FetchRecentDocumentsResponseDto {
  documents: Document[];
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
  workspaceId: number;
  start: Date;
  end: Date;
}

export interface fetchCalendarResponseDto {
  documentList: DocumentList[];
}
