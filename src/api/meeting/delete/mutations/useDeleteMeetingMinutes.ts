import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastType } from '@common/types/toast.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';
import { handleMeetingError } from '@common/errors/meeting-error.utils';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { meetingIdRequestDto } from '../../api.types';
import deleteMeetingMinutes from '../apis/deleteMeetingMinutes';

/**
 * AI Meeting 회의록을 React Query로 삭제하는 커스텀 훅
 *
 * - 내부적으로 `deleteMeetingMinutes` API 함수를 호출합니다.
 */
const useDeleteMeetingMinutes = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastActions();

  const listKey = queryKeys.meetings.meetingMinutesList(workspaceId).queryKey;

  return useMutation({
    mutationFn: (data: meetingIdRequestDto) => deleteMeetingMinutes(data),

    onSuccess: async () => {
      // 회의록 리스트 다시 호출
      await queryClient.invalidateQueries({ queryKey: listKey });
      addToast({ text: '회의록이 삭제되었습니다.', type: ToastType.SUCCESS });
    },

    onError: (error: ApiError) => {
      handleMeetingError(error, { addToast });
    },
  });
};

export default useDeleteMeetingMinutes;
