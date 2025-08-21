import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import {
  MeetingMinutesDownloadLinkRequestDTO,
  MeetingMinutesDownloadLinkResponseDTO,
} from '../../api.types';

/**
 * meetingId를 받아 회의록을 다운로드하는 링크 가져오는 함수
 *
 * @param {meetingIdRequestDto} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 조회할 meeting ID
 * @param {DownloadFormat} params.format - 다운로드할 회의록 포맷
 */
const fetchMeetingMinutesDownloadLink = async ({
  meetingId,
  format,
}: MeetingMinutesDownloadLinkRequestDTO) => {
  const response = await defaultApi<BaseResponseDto<MeetingMinutesDownloadLinkResponseDTO>>(
    `${MEETING_API_ENDPOINTS.MEETING_MINUTES_DOWNLOAD_LINK(meetingId)}?format=${format}`,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMeetingMinutesDownloadLink;
