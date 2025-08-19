import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateSnsEventAssistantRequestDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { UpdateSnsEvent } from '../apis/update-sns-event';

/**
 * SNS 이벤트의 제목을 수정하기 위한 TanStack Query 뮤테이션 훅입니다.
 * 훅의 `mutate` 함수는 UpdateSnsEventAssistantRequestDto 타입의 객체를 전달받습니다.
 * @param {string} mutationVariables.snsEventId - 수정할 SNS 이벤트의 고유 ID입니다.
 * @param {string} mutationVariables.title - 수정할 새로운 이벤트 제목입니다.
 */
const useUpdateSnsEventMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { snsEventId } = useParams<{ snsEventId: string }>();

  return useMutation<
    unknown, // TData
    ApiError<ApiErrorBody>, // TError
    UpdateSnsEventAssistantRequestDto // TMutateVariables
  >({
    mutationFn: ({ snsEventId, title }) => UpdateSnsEvent({ snsEventId, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.snsEventAssistant.detail(snsEventId).queryKey,
      });
    },
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND);
      }
    },
  });
};

export default useUpdateSnsEventMutation;
