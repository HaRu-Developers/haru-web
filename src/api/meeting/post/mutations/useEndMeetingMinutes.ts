import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { meetingIdRequestDto } from '../../api.types';
import endMeetingMinutes from '../apis/endMeetingMinutes';

/**
 * AI Meeting 끝내는 요청 보내는 훅
 *
 * - 내부적으로 `endMeetingMinutes` API 함수를 호출합니다.
 */
const useEndMeetingMinutes = (workspaceId: string, meetingId: string) => {
  const queryClient = useQueryClient();

  const detailKey = queryKeys.meetings.detail(meetingId).queryKey;

  return useMutation({
    mutationKey: queryKeys.meetings.end(meetingId).queryKey,
    mutationFn: (data: meetingIdRequestDto) => endMeetingMinutes(data),
    onSuccess: async () => {
      // 회의록 디테일 다시 호출
      // proceeding
      await queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

export default useEndMeetingMinutes;
