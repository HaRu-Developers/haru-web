import { notFound } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { DeleteSnsEventAssistantRequestDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from '@common/errors/ApiError';

import { DeleteSnsEvent } from '../apis/delete-sns-event';

const useDeleteSnsEventMutation = () => {
  return useMutation<
    unknown, // TData
    ApiError<ApiErrorBody>, // TError
    DeleteSnsEventAssistantRequestDto // TMutateVariables
  >({
    mutationFn: ({ snsEventId }) => DeleteSnsEvent({ snsEventId }),
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        notFound();
      }
    },
  });
};

export default useDeleteSnsEventMutation;
