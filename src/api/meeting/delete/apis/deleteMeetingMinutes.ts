import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { DeleteMeetingMinutesResponse, meetingIdRequestDto } from '../../api.types';

/**
 * AI Meeting 회의록 삭제
 *
 * @param {meetingIdRequestDto} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 조회할 meeting ID
 */
export const deleteMeetingMinutes = async ({ meetingId }: meetingIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<DeleteMeetingMinutesResponse>>(
    MEETING_API_ENDPOINTS.DELETE_MEETING_MINUTES(meetingId),
    {
      method: 'DELETE',
      auth: true,
    },
  );

  return response;
};

export default deleteMeetingMinutes;
