import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { MeetingMinutesSpeechQuestionDTO, meetingIdRequestDto } from '../../api.types';

/**
 * meeting Id로 음성기록과 해당 음성기록과 연계된 AI 추천질문 동시 조회
 *
 * @param {meetingIdRequestDto} params - 요청 파라미터
 * @param {string} params.meetingId - 회의록을 조회할 meeting ID
 */
const fetchMeetingMinutesSpeechQuestion = async ({ meetingId }: meetingIdRequestDto) => {
  const response = await defaultApi<BaseResponseDto<MeetingMinutesSpeechQuestionDTO>>(
    MEETING_API_ENDPOINTS.MEETING_MINUTES_SPEECH_QUESTION(meetingId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchMeetingMinutesSpeechQuestion;
