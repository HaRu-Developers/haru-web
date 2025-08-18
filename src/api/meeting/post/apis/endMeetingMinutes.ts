import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { meetingIdRequestDto } from '../../api.types';

/**
 * 회의 종료 요청 함수
 *
 * @param {meetingIdRequestDto} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 조회할 meeting Id
 */
export const endMeetingMinutes = async ({ meetingId }: meetingIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<string>>(
    MEETING_API_ENDPOINTS.MEETING_MINUTES_END(meetingId),
    {
      method: 'POST',
      auth: true,
    },
  );

  return response;
};

export default endMeetingMinutes;
