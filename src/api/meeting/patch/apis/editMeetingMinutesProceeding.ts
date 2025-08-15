import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import {
  EditMeetingMinutesProceedingParams,
  EditMeetingMinutesProceedingRequestDto,
  EditMeetingMinutesResponse,
} from '../../api.types';

/**
 * AI Meeting 회의 진행 내용을 수정하는 함수
 *
 * 지정된 회의록(`meetingId`)의 진행 내용을 수정합니다.
 *
 * @param {EditMeetingMinutesProceedingParams} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 지정할 meeting Id
 * @param {string} params.proceeding - 수정할 진행 내용
 */
const editMeetingMinutesProceeding = async ({
  meetingId,
  proceeding,
}: EditMeetingMinutesProceedingParams) => {
  const response = await defaultApi<BaseResponseDto<EditMeetingMinutesResponse>>(
    MEETING_API_ENDPOINTS.EDIT_MEETING_MINUTES_PROCEEDING(meetingId),
    {
      method: 'PATCH',
      auth: true,
      // 검증만 하고 캐스팅은 안 함
      body: JSON.stringify({ proceeding } satisfies EditMeetingMinutesProceedingRequestDto),
    },
  );

  return response;
};

export default editMeetingMinutesProceeding;
