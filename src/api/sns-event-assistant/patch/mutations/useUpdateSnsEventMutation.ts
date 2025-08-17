import { notFound, useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateSnsEventAssistantRequestDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { UpdateSnsEvent } from '../apis/update-sns-event';

const useUpdateSnsEventMutation = () => {
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
        notFound();
      }
    },
  });
};

export default useUpdateSnsEventMutation;
