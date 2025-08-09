import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { CreateMeetingMinutesRequestDto } from '../../api.types';
import createNewMeetingMinutes from '../apis/createNewMeetingMinutes';

/**
 * AI Meeting 회의록을 React Query로 생성하는 커스텀 훅
 *
 * - 내부적으로 `createNewMeetingMinutes` API 함수를 호출합니다.
 * - 성공 시 `extra`에 회의록 배열(`MeetingMinutesInfo[]`)을 제공합니다.
 */
const useCreateNewMeetingMinutes = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const listKey = queryKeys.meetings.meetingMinutesList(workspaceId).queryKey;

  return useMutation({
    mutationFn: (meetingData: CreateMeetingMinutesRequestDto) =>
      createNewMeetingMinutes(meetingData),

    onSuccess: async () => {
      // 회의록 리스트 다시 호출
      await queryClient.invalidateQueries({ queryKey: listKey });
    },

    onError: (error) => {
      console.error('[회의록 생성 실패]', error);
    },
  });
};

export default useCreateNewMeetingMinutes;
