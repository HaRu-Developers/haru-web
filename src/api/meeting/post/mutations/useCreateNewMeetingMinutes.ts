'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastType } from '@common/types/toast.types';

import queryKeys from '@common/constants/query-key.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { CreateMeetingMinutesRequestDto } from '../../api.types';
import createNewMeetingMinutes from '../apis/createNewMeetingMinutes';

/**
 * AI Meeting 회의록을 React Query로 생성하는 커스텀 훅
 *
 * - 내부적으로 `createNewMeetingMinutes` API 함수를 호출합니다.
 */
const useCreateNewMeetingMinutes = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const listKey = queryKeys.meetings.list(workspaceId).queryKey;
  const { addToast } = useToastActions();

  return useMutation({
    mutationKey: queryKeys.meetings.create.queryKey,
    mutationFn: (meetingData: CreateMeetingMinutesRequestDto) =>
      createNewMeetingMinutes(meetingData),

    onSuccess: async () => {
      // 회의록 리스트 다시 호출
      await queryClient.invalidateQueries({ queryKey: listKey });
      addToast({ text: '회의록이 생성되었습니다.', type: ToastType.SUCCESS });
    },
    onError: (_err) => {
      addToast({ text: '회의록이 생성을 실패했습니다.', type: ToastType.ERROR });
    },
  });
};

export default useCreateNewMeetingMinutes;
