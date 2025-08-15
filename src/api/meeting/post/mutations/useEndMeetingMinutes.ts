import { useMutation } from '@tanstack/react-query';

import { ToastType } from '@common/types/toast.types';

import queryKeys from '@common/constants/query-key.constants';

import { meetingIdRequestDto } from '../../api.types';
import endMeetingMinutes from '../apis/endMeetingMinutes';

/**
 * AI Meeting 끝내는 요청 보내는 훅
 *
 * - 내부적으로 `endMeetingMinutes` API 함수를 호출합니다.
 */
const useEndMeetingMinutes = (meetingId: string) => {
  return useMutation({
    mutationKey: queryKeys.meetings.end(meetingId).queryKey,
    mutationFn: (data: meetingIdRequestDto) => endMeetingMinutes(data),
  });
};

export default useEndMeetingMinutes;
