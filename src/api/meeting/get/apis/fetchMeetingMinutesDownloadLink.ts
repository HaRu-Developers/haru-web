import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { MeetingMinutesDownloadLinkResponseDTO, meetingIdRequestDto } from '../../api.types';

/**
 * meetingId를 받아 회의록을 다운로드하는 링크 가져오는 함수
 *
 * @param {meetingIdRequestDto} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 조회할 meeting ID
 */
const fetchMeetingMinutesDownloadLink = async ({ meetingId }: meetingIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<MeetingMinutesDownloadLinkResponseDTO>>(
    MEETING_API_ENDPOINTS.MEETING_MINUTES_DOWNLOAD_LINK(meetingId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMeetingMinutesDownloadLink;
