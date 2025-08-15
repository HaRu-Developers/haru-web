import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { FetchMeetingMinutesDetailResponseDto, meetingIdRequestDto } from '../../api.types';

/**
 * AI Meeting 회의록 목록을 조회하는 함수
 *
 * 지정된 회의록(`meetingId`)의 내용을 가져옵니다.
 *
 * @param {meetingIdRequestDto} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 조회할 meeting ID
 */
const fetchMeetingMinutesDetail = async ({ meetingId }: meetingIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<FetchMeetingMinutesDetailResponseDto>>(
    MEETING_API_ENDPOINTS.MEETING_MINUTES_DETAIL(meetingId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMeetingMinutesDetail;
