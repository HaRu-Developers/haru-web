// CRUD 순서
import { Format, SnsEventAssistantListType } from '@common/types/download.enum.types';

// 객체
export interface SnsEventAssistantId {
  snsEventId: string;
}

export interface WorkspaceId {
  workspaceId: string;
}

export interface SnsEventAssistantCondition {
  winnerCount: number;
  isPeriod: boolean;
  period: Date | null;
  isKeyword: boolean;
  keyword: string | null;
  isTaged: boolean;
  tageCount: number | null;
}

export interface PeopleList {
  account: string;
}

export interface SnsEventAssistantListObject extends SnsEventAssistantId {
  title: string;
  participantCount: number;
  winnerCount: number;
  snsLink: string;
  updatedAt: Date;
}

export interface SnsEventAssistantObject extends WorkspaceId {
  title: string;
  creatorId: string;
  creatorName: string;
  updatedAt: Date;
  participantList: PeopleList[];
  winnerList: PeopleList[];
  snsLink: string;
}

// Request DTO
/**
 * SNS 이벤트 어시스턴트 생성 Request DTO
 */
export interface CreateSnsEventAssistantRequestDto extends WorkspaceId {
  title: string;
  snsEventLink: string;
  condition: SnsEventAssistantCondition;
}

/**
 * SNS 이벤트 어시스턴트 조회 Request DTO
 */
export type GetSnsEventAssistantRequestDto = SnsEventAssistantId;

/**
 * SNS 이벤트 어시스턴트 리스트 조회 Request DTO
 */
export type GetSnsEventAssistantListRequestDto = WorkspaceId;

/**
 * SNS 이벤트 어시스턴트 리스트 다운로드 Request DTO
 */
export interface GetSnsEventAssistantListDownloadRequestDto extends SnsEventAssistantId {
  listType: SnsEventAssistantListType;
  format: Format;
}

/**
 * SNS 이벤트 어시스턴트 수정 Request DTO
 */
export interface UpdateSnsEventAssistantRequestDto extends SnsEventAssistantId {
  title: string;
}

/**
 * SNS 이벤트 어시스턴트 삭제 Request DTO
 */
export type DeleteSnsEventAssistantRequestDto = SnsEventAssistantId;

// Response DTO
/**
 * SNS 이벤트 어시스턴트 생성 Response DTO
 */
export type CreateSnsEventAssistantResponseDto = SnsEventAssistantId;

/**
 * SNS 이벤트 어시스턴트 조회 Response DTO
 */
export type GetSnsEventAssistantResponseDto = SnsEventAssistantObject;

/**
 * SNS 이벤트 어시스턴트 리스트 조회 Response DTO
 */
export interface GetSnsEventAssistantListResponseDto {
  snsEventList: SnsEventAssistantListObject[];
}

/**
 * SNS 이벤트 어시스턴트 리스트 다운로드 Response DTO
 */
export interface GetSnsEventAssistantListDownloadResponseDto {
  downloadLink: string;
}

// SNS 이벤트 어시스턴트 update, delete response 없음
