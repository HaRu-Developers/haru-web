/**
 * 다운로드 포맷 타입을 정의합니다.
 */
import { ApiErrorBody } from '@common/types/api.common.types';
import { DownloadFormat, SnsEventAssistantListType } from '@common/types/download.enum.types';

import { ApiError } from '@common/errors/ApiError';

/**
 * SNS 이벤트 ID를 포함하는 기본 인터페이스.
 * @property {string} snsEventId - SNS 이벤트의 고유 식별자.
 */
export interface SnsEventAssistantId {
  snsEventId: string;
}

/**
 * 워크스페이스 ID를 포함하는 기본 인터페이스.
 * @property {string} workspaceId - 워크스페이스의 고유 식별자.
 */
export interface WorkspaceId {
  workspaceId: string;
}

/**
 * SNS 이벤트 추첨 조건을 정의하는 인터페이스.
 * @property {number} winnerCount - 당첨자 수.
 * @property {boolean} isPeriod - 기간 필터 적용 여부.
 * @property {Date | null} period - 추첨 기간. `isPeriod`가 `true`일 경우 유효.
 * @property {boolean} isKeyword - 키워드 필터 적용 여부.
 * @property {string | null} keyword - 포함할 키워드. `isKeyword`가 `true`일 경우 유효.
 * @property {boolean} isTaged - 태그 필터 적용 여부.
 * @property {number | null} tageCount - 태그된 계정 수. `isTaged`가 `true`일 경우 유효.
 */
export interface SnsEventAssistantCondition {
  winnerCount: number;
  isPeriod: boolean;
  period: Date | null;
  isKeyword: boolean;
  keyword: string | null;
  isTaged: boolean;
  tageCount: number | null;
}

/**
 * 참여자/당첨자 목록에 사용되는 사용자 계정 인터페이스.
 * @property {string} account - 사용자 계정.
 */
export interface PeopleList {
  account: string;
}

/**
 * SNS 이벤트 목록 조회에 사용되는 객체 인터페이스.
 * `SnsEventAssistantId`를 상속받습니다.
 * @property {string} title - 이벤트 제목.
 * @property {number} participantCount - 이벤트 참여자 수.
 * @property {number} winnerCount - 이벤트 당첨자 수.
 * @property {string} snsLink - SNS 이벤트 원본 링크.
 * @property {Date} updatedAt - 최종 업데이트 날짜.
 */
export interface SnsEventAssistantListObject extends SnsEventAssistantId {
  title: string;
  participantCount: number;
  winnerCount: number;
  snsLink: string;
  updatedAt: Date;
}

/**
 * SNS 이벤트 상세 조회에 사용되는 객체 인터페이스.
 * `WorkspaceId`를 상속받습니다.
 * @property {string} title - 이벤트 제목.
 * @property {string} creatorId - 생성자 ID.
 * @property {string} creatorName - 생성자 이름.
 * @property {Date} updatedAt - 최종 업데이트 날짜.
 * @property {PeopleList[]} participantList - 참여자 목록.
 * @property {PeopleList[]} winnerList - 당첨자 목록.
 * @property {string} snsLink - SNS 이벤트 원본 링크.
 */
export interface SnsEventAssistantObject extends WorkspaceId {
  title: string;
  creatorId: string;
  creatorName: string;
  updatedAt: Date;
  participantList: PeopleList[];
  winnerList: PeopleList[];
  snsLink: string;
}

/**
 * SNS 이벤트 생성 요청 데이터 전송 객체 (DTO).
 * `WorkspaceId`를 상속받습니다.
 * @property {string} title - 이벤트 제목.
 * @property {string} snsEventLink - SNS 이벤트 원본 링크.
 * @property {SnsEventAssistantCondition} snsCondition - 이벤트 추첨 조건.
 */
export interface CreateSnsEventAssistantRequestDto extends WorkspaceId {
  title: string;
  snsEventLink: string;
  snsCondition: SnsEventAssistantCondition;
}

/**
 * SNS 이벤트 조회 요청 데이터 전송 객체 (DTO).
 */
export type GetSnsEventAssistantRequestDto = SnsEventAssistantId;

/**
 * SNS 이벤트 리스트 조회 요청 데이터 전송 객체 (DTO).
 */
export type GetSnsEventAssistantListRequestDto = WorkspaceId;

/**
 * SNS 이벤트 리스트 다운로드 요청 데이터 전송 객체 (DTO).
 * `SnsEventAssistantId`를 상속받습니다.
 * @property {SnsEventAssistantListType} listType - 다운로드할 목록의 타입 (예: `PARTICIPANT`, `WINNER`).
 * @property {Format} format - 다운로드 파일 포맷 (예: `CSV`, `XLSX`).
 */
export interface GetSnsEventAssistantListDownloadRequestDto extends SnsEventAssistantId {
  listType: SnsEventAssistantListType;
  format: DownloadFormat;
}

/**
 * SNS 이벤트 수정 요청 데이터 전송 객체 (DTO).
 * `SnsEventAssistantId`를 상속받습니다.
 * @property {string} title - 수정할 이벤트 제목.
 */
export interface UpdateSnsEventAssistantRequestDto extends SnsEventAssistantId {
  title: string;
}

/**
 * SNS 이벤트 삭제 요청 데이터 전송 객체 (DTO).
 */
export type DeleteSnsEventAssistantRequestDto = SnsEventAssistantId;

/**
 * SNS 이벤트 생성 응답 데이터 전송 객체 (DTO).
 */
export type CreateSnsEventAssistantResponseDto = SnsEventAssistantId;

/**
 * SNS 이벤트 조회 응답 데이터 전송 객체 (DTO).
 */
export type GetSnsEventAssistantResponseDto = SnsEventAssistantObject;

/**
 * SNS 이벤트 리스트 조회 응답 데이터 전송 객체 (DTO).
 * @property {SnsEventAssistantListObject[]} snsEventList - 조회된 SNS 이벤트 목록.
 */
export interface GetSnsEventAssistantListResponseDto {
  snsEventList: SnsEventAssistantListObject[];
}

/**
 * SNS 이벤트 리스트 다운로드 응답 데이터 전송 객체 (DTO).
 * @property {string} downloadLink - 다운로드 가능한 파일의 URL.
 */
export interface GetSnsEventAssistantListDownloadResponseDto {
  downloadLink: string;
}

/**
 * SNS 이벤트 리스트 다운로드 외부에서 사용할 옵션 인터페이스.
 */
export interface UseSnsEventAssistantListDownloadOptions {
  enabled?: boolean;
  onSuccess?: (data: GetSnsEventAssistantListDownloadResponseDto) => void;
  onError?: (error: ApiError<ApiErrorBody>) => void;
}
