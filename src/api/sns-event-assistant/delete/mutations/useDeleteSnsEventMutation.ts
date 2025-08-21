import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DeleteSnsEventAssistantRequestDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { DeleteSnsEvent } from '../apis/delete-sns-event';

/**
 * SNS 이벤트를 삭제하는 TanStack Query 뮤테이션 훅입니다.
 * @param {string} workspaceId - 삭제 후 SNS 이벤트 목록을 갱신하기 위한 워크스페이스 ID입니다.
 */
const useDeleteSnsEventMutation = (workspaceId: string) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation<
    unknown, // TData
    ApiError<ApiErrorBody>, // TError
    DeleteSnsEventAssistantRequestDto // TMutateVariables
  >({
    mutationFn: ({ snsEventId }) => DeleteSnsEvent({ snsEventId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.snsEventAssistant.list(workspaceId).queryKey,
      });
    },
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND);
      }
    },
  });
};

export default useDeleteSnsEventMutation;
