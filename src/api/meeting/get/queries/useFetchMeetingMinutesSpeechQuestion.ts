import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { DEFAULT_SPEECH_QUESTION } from '@features/ai-meeting-manager/constants/speechQuestion.constants';

import { MeetingMinutesSpeechQuestionDTO } from '../../api.types';
import fetchMeetingMinutesSpeechQuestion from '../apis/fetchMeetingMinutesSpeechQuestion';

/**
 * 특정 회의록 발화, 질문들 가져오는 훅
 */
const useFetchMeetingMinutesSpeechQuestion = (meetingId: string) => {
  return useAfterQuery<
    { result: MeetingMinutesSpeechQuestionDTO }, // TData
    ApiError<ApiErrorBody>, // TError
    MeetingMinutesSpeechQuestionDTO // TExtra
  >({
    queryKey: queryKeys.meetings.speechQuestion(meetingId).queryKey,
    queryFn: () => fetchMeetingMinutesSpeechQuestion({ meetingId }),
    enabled: !!meetingId,
    retry: false,
    extra: (qr) => qr.data?.result ?? DEFAULT_SPEECH_QUESTION,
  });
};

export default useFetchMeetingMinutesSpeechQuestion;
