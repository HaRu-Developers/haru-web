import { DownloadFormat } from '@common/types/download.enum.types';

import { Speech } from '@features/ai-meeting-manager/types/meeting.types';

// ========== 공통 요청 ==========
/**
 * 워크스페이스 ID를 포함하는 요청 DTO
 *
 * @property {string} workspaceId - 워크스페이스 고유 ID
 */
export interface WorkspaceIdRequestDto {
  workspaceId: string;
}

// ========== 공통 응답 ==========
/**
 * 회의록 title, proceeding 수정 응답
 */
export type EditMeetingMinutesResponse = string;

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

// ========== 회의록 단일 조회 ==========
/**
 * 회의록 디테일, 응답 DTO
 *
 * @property {string} userId       - 회의록 생성자 ID
 * @property {string} email        - 생성자 이메일
 * @property {string} userName     - 생성자 이름
 * @property {string} workspaceId  - 소속 워크스페이스 ID
 * @property {string} title        - 회의록 제목
 * @property {string} proceeding   - 회의 진행 내용
 * @property {string} updatedAt    - 마지막 수정 시각
 */
export interface MeetingMinutesDetail {
  userId: string;
  email: string;
  userName: string;
  workspaceId: string;
  title: string;
  proceeding: string;
  updatedAt: string;
}

export type FetchMeetingMinutesDetailResponseDto = MeetingMinutesDetail;

// ========== 회의록 title 수정 ==========
/**
 * 회의록 title 수정 요청 DTO
 *
 * @property {string} title    - 제목 수정 내용
 */
export interface EditMeetingMinutesTitleRequestDto {
  title: string;
}

/**
 * 회의록 title 수정 요청 api 함수 params
 *
 * @property {string} meetingId
 * @property {string} title
 */
export interface EditMeetingMinutesTitleParams extends EditMeetingMinutesTitleRequestDto {
  meetingId: string;
}

// ========== 회의록 proceeding 수정 ==========
/**
 * 회의록 proceeding 수정 요청 DTO
 *
 * @property {string} proceeding    - 진행 내용 수정 내용
 */
export interface EditMeetingMinutesProceedingRequestDto {
  proceeding: string;
}

/**
 * 회의록 proceeding 수정 요청 api 함수 params
 *
 * @property {string} meetingId
 * @property {string} proceeding
 */
export interface EditMeetingMinutesProceedingParams extends EditMeetingMinutesProceedingRequestDto {
  meetingId: string;
}

// ========== 회의 발화, 추천질문 ==========
/**
 * 회의 발화와 추천 질문 데이터를 포함한 DTO
 *
 * @property {string} meetingStartTime - 회의 시작 시각 (ISO 8601 형식)
 * @property {Speech[]} transcripts - 회의 발화(Transcript) 목록
 */
export interface MeetingMinutesSpeechQuestionDTO {
  meetingStartTime: string;
  transcripts: Speech[];
}

// ========== 회의록 다운로드 링크 ==========
/**
 * 회의록 다운로드 요청 DTO
 *
 * @property {string} meetingId
 * @property {DownloadFormat} format - 다운로드할 파일 포맷
 */
export interface MeetingMinutesDownloadLinkRequestDTO {
  meetingId: string;
  format: DownloadFormat;
}

/**
 * 회의록 실제 파일 URL 응답 DTO
 *
 * @property {string} downloadLink - 실제 파일 URL
 */
export interface MeetingMinutesDownloadLinkResponseDTO {
  downloadLink: string;
}

// ========== 회의록 음성 링크 ==========
/**
 * 회의록 음성 링크 응답 DTO
 *
 * @property {string} voiceLink - 음성 링크
 */
export interface MeetingMinutesVoiceLinkResponseDTO {
  voiceLink: string;
}
