import { FileType } from '@common/types/file-type.enum';

/**
 * 워크스페이스 ID를 포함하는 요청 DTO
 *
 * @property {string} workspaceId - 워크스페이스 고유 ID
 */
export interface WorkspaceIdRequestDto {
  workspaceId: string;
}

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
 * 회의록 리스트 응답 DTO
 *
 * @property {MeetingMinutesInfo[]} meetingMinutesList - 회의록 리스트
 */
export interface MeetingMinutesListResponseDto {
  meetingMinutesList: MeetingMinutesInfo[];
}
