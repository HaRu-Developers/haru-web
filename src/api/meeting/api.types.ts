import { FileType } from '@common/types/file-type.enum';

// ========== 공통 요청 ==========
/**
 * 워크스페이스 ID를 포함하는 요청 DTO
 *
 * @property {string} workspaceId - 워크스페이스 고유 ID
 */
export interface WorkspaceIdRequestDto {
  workspaceId: string;
}

/**
 * meeting ID를 포함하는 요청 DTO
 *
 * @property {string} meetingId - meeting 고유 ID
 */
export interface meetingIdRequestDto {
  meetingId: string;
}

// ========== 회의록 생성 ===========
/**
 * 회의록 생성 요청의 상세 정보
 *
 * @property {string} workspaceId - 회의록을 생성하는 워크스페이스 ID
 * @property {string} title - 회의록 제목
 */
export interface CreateMeetingMinutesRequest {
  workspaceId: string;
  title: string;
}

/**
 * 회의록 생성 API 요청 DTO
 *
 * @property {File} agendaFile - 업로드된 안건 파일
 * @property {CreateMeetingMinutesRequest} request - 회의록 생성 요청 본문
 */
export interface CreateMeetingMinutesRequestDto {
  agendaFile: File;
  request: CreateMeetingMinutesRequest;
}

/**
 * 회의록 생성 API 응답 DTO
 *
 * @property {string} meetingId - 생성된 회의록 ID
 * @property {string} title - 회의록 제목
 */
export interface CreateMeetingMinutesResponseDto {
  meetingId: string;
  title: string;
}

// ========== 회의록 리스트 ==========
/**
 * 회의록 정보
 *
 * @property {string} meetingId - 회의 고유 ID
 * @property {string} title - 회의록 제목
 * @property {string} updatedAt - 회의록 최종 수정 시간
 * @property {boolean} creator - 회의록 생성자 여부
 */
export interface MeetingMinutesInfo {
  meetingId: string;
  title: string;
  updatedAt: string;
  creator: boolean;
}

/**
 * 회의록 리스트 응답 내용
 *
 * @property {MeetingMinutesInfo[]} meetingMinutesList - 회의록 리스트
 */
export type MeetingMinutesListResponse = MeetingMinutesInfo[];

// ========== 회의록 삭제 ==========
/**
 * 회의록 삭제 응답
 *
 * @property {MeetingMinutesInfo[]} meetingMinutesList - 회의록 리스트
 */
export type DeleteMeetingMinutesResponse = string;
