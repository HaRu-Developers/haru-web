import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BaseResponseDto } from '@common/types/api.common.types';
import { ToastType } from '@common/types/toast.types';

import queryKeys from '@common/constants/query-key.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import {
  EditMeetingMinutesProceedingParams,
  FetchMeetingMinutesDetailResponseDto,
} from '../../api.types';
import editMeetingMinutesProceeding from '../apis/editMeetingMinutesProceeding';

type Detail = BaseResponseDto<FetchMeetingMinutesDetailResponseDto>;

/**
 * AI Meeting 회의록 진행 내용을 수정하는 커스텀 훅
 *
 * - 내부적으로 `editMeetingMinutesProceeding` API 함수를 호출합니다.
 */
const useEditMeetingMinutesProceeding = (meetingId: string) => {
  const qc = useQueryClient();
  const { addToast } = useToastActions();

  return useMutation({
    mutationKey: queryKeys.meetings.editProceeding(meetingId).queryKey,

    mutationFn: (data: EditMeetingMinutesProceedingParams) => editMeetingMinutesProceeding(data),

    onMutate: async ({ meetingId, proceeding }) => {
      const detailKey = queryKeys.meetings.detail(meetingId).queryKey;

      await qc.cancelQueries({ queryKey: detailKey });

      const prev = qc.getQueryData<Detail>(detailKey);

      if (prev?.result) {
        qc.setQueryData<Detail>(detailKey, {
          ...prev,
          result: { ...prev.result, proceeding },
        });
      }

      return { detailKey, prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev && ctx?.detailKey) {
        qc.setQueryData(ctx.detailKey, ctx.prev);
      }
      addToast({
        text: '진행 내용 수정을 실패했습니다.',
        type: ToastType.ERROR,
      });
    },
    onSuccess: async (_data, _variables) => {
      // 회의록 상세 정보 다시 호출
      const detailKey = queryKeys.meetings.detail(meetingId).queryKey;

      await qc.invalidateQueries({
        queryKey: detailKey,
      });
    },
  });
};

export default useEditMeetingMinutesProceeding;
