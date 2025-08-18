import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastType } from '@common/types/toast.types';

import queryKeys from '@common/constants/query-key.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import deleteMeetingMinutes from '../apis/deleteMeetingMinutes';

/**
 * AI Meeting 회의록을 React Query로 삭제하는 커스텀 훅
 *
 * 삭제할 meetingId 배열을 받아 내부적으로 `deleteMeetingMinutes` API 함수를 호출해 다중 삭제 합니다.
 */
const useDeleteMeetingMinutesMany = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastActions();

  const listKey = queryKeys.meetings.list(workspaceId).queryKey;

  return useMutation({
    mutationKey: queryKeys.meetings.delete(workspaceId).queryKey,

    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => deleteMeetingMinutes({ meetingId: id })));
    },

    onSuccess: async () => {
      // 회의록 리스트 다시 호출
      await queryClient.invalidateQueries({ queryKey: listKey });
      // 삭제 성공 토스트 표시
      addToast({ text: '회의록이 삭제되었습니다.', type: ToastType.SUCCESS });
    },
    onError: (_err) => {
      // 삭제 실패 토스트 표시
      addToast({ text: '회의록 삭제를 실패했습니다.', type: ToastType.ERROR });
    },
  });
};

export default useDeleteMeetingMinutesMany;
