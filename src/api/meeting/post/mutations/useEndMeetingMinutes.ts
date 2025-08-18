import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { meetingIdRequestDto } from '../../api.types';
import endMeetingMinutes from '../apis/endMeetingMinutes';

/**
 * AI Meeting 끝내는 요청 보내는 훅
 *
 * - 내부적으로 `endMeetingMinutes` API 함수를 호출합니다.
 */
const useEndMeetingMinutes = (workspaceId: string, meetingId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const listKey = queryKeys.meetings.list(workspaceId).queryKey;

  return useMutation({
    mutationKey: queryKeys.meetings.end(meetingId).queryKey,
    mutationFn: (data: meetingIdRequestDto) => endMeetingMinutes(data),
    onSuccess: async () => {
      // 회의록 화면으로 이동
      // 회의 화면으로 다시 못 가게 replace 사용
      router.replace(ROUTES.AI_MEETING_MANAGER.MINUTES(workspaceId, meetingId));
      // 회의록 리스트 다시 호출
      // GnbLeft에 보이니까
      await queryClient.invalidateQueries({ queryKey: listKey });
    },
  });
};

export default useEndMeetingMinutes;
