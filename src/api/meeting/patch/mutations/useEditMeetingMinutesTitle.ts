import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BaseResponseDto } from '@common/types/api.common.types';
import { ToastType } from '@common/types/toast.types';

import queryKeys from '@common/constants/query-key.constants';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import {
  EditMeetingMinutesTitleParams,
  FetchMeetingMinutesDetailResponseDto,
} from '../../api.types';
import editMeetingMinutesTitle from '../apis/editMeetingMinutesTitle';

type Detail = BaseResponseDto<FetchMeetingMinutesDetailResponseDto>;

/**
 * AI Meeting 회의록 진행 내용을 수정하는 커스텀 훅
 *
 * - 내부적으로 `editMeetingMinutesTitle` API 함수를 호출합니다.
 */
const useEditMeetingMinutesTitle = (meetingId: string) => {
  const qc = useQueryClient();
  const { addToast } = useToastActions();

  return useMutation({
    mutationKey: queryKeys.meetings.editTitle(meetingId).queryKey,

    mutationFn: (data: EditMeetingMinutesTitleParams) => editMeetingMinutesTitle(data),

    // 낙관적 업데이트 - 캐시에 새 제목 즉시 반영
    onMutate: async ({ meetingId, title }) => {
      const detailKey = queryKeys.meetings.detail(meetingId).queryKey;

      await qc.cancelQueries({ queryKey: detailKey });
      const prev = qc.getQueryData<Detail>(detailKey);

      if (prev?.result) {
        qc.setQueryData<Detail>(detailKey, {
          ...prev,
          result: { ...prev.result, title },
        });
      }

      // 롤백용 컨텍스트
      return { detailKey, prev };
    },

    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev && ctx?.detailKey) {
        qc.setQueryData(ctx.detailKey, ctx.prev);
      }
      addToast({
        text: '제목 수정을 실패했습니다.',
        type: ToastType.ERROR,
      });
    },

    // 성공 후 서버 상태 동기화
    onSuccess: async (_data, { meetingId }) => {
      const detailKey = queryKeys.meetings.detail(meetingId).queryKey;

      // 캐시에서 workspaceId 얻어 최근문서도 무효화
      const cached = qc.getQueryData<Detail>(detailKey);
      const workspaceId = cached?.result?.workspaceId;

      // 회의록 상세 정보, 최근 문서 다시 호출
      await Promise.all([
        qc.invalidateQueries({ queryKey: detailKey }),
        workspaceId
          ? qc.invalidateQueries({
              queryKey: queryKeys.workspaces.recentDocuments(String(workspaceId)).queryKey,
            })
          : Promise.resolve(),
      ]);
    },
  });
};

export default useEditMeetingMinutesTitle;
