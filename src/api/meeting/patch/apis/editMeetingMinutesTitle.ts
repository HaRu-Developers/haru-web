import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import {
  EditMeetingMinutesResponse,
  EditMeetingMinutesTitleParams,
  EditMeetingMinutesTitleRequestDto,
} from '../../api.types';

/**
 * AI Meeting 회의록 제목을 수정하는 함수
 *
 * 지정된 회의록(`meetingId`)의 제목을 수정합니다.
 *
 * @param {EditMeetingMinutesTitleParams} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 지정할 meeting Id
 * @param {string} params.title - 수정할 제목
 */
const editMeetingMinutesTitle = async ({ meetingId, title }: EditMeetingMinutesTitleParams) => {
  console.log(title, '로 변경 호출');
  const response = await defaultApi<BaseResponseDto<EditMeetingMinutesResponse>>(
    MEETING_API_ENDPOINTS.EDIT_MEETING_MINUTES_TITLE(meetingId),
    {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify({ title } satisfies EditMeetingMinutesTitleRequestDto),
    },
  );

  return response;
};

export default editMeetingMinutesTitle;
