import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { meetingIdRequestDto } from '../../api.types';
import deleteMeetingMinutes from '../apis/deleteMeetingMinutes';

/**
 * AI Meeting 회의록을 React Query로 삭제하는 커스텀 훅
 *
 * - 내부적으로 `deleteMeetingMinutes` API 함수를 호출합니다.
 */
const useDeleteMeetingMinutes = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const listKey = queryKeys.meetings.meetingMinutesList(workspaceId).queryKey;

  return useMutation({
    mutationFn: (meetingId: meetingIdRequestDto) => deleteMeetingMinutes(meetingId),

    onSuccess: async () => {
      // 회의록 리스트 다시 호출
      await queryClient.invalidateQueries({ queryKey: listKey });
    },

    onError: (error) => {
      console.error('[회의록 삭제 실패]', error);
    },
  });
};

export default useDeleteMeetingMinutes;
