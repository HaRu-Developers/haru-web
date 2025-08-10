import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { MeetingMinutesListResponse, WorkspaceIdRequestDto } from '../../api.types';

/**
 * AI Meeting 회의록 목록을 조회하는 함수
 *
 * 지정된 워크스페이스(`workspaceId`)에 해당하는 회의록 목록을 가져옵니다.
 *
 * @param {WorkspaceIdRequestDto} params - 요청 파라미터
 * @param {string} params.workspaceId - 회의록을 조회할 워크스페이스 ID
 */
const fetchMeetingMinutesList = async ({ workspaceId }: WorkspaceIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<MeetingMinutesListResponse>>(
    MEETING_API_ENDPOINTS.MEETING_MINUTES_LIST(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMeetingMinutesList;
