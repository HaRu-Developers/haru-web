import { notFound } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { UpdateSnsEventAssistantRequestDto } from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from '@common/errors/ApiError';

import { UpdateSnsEvent } from '../apis/update-sns-event';

const useUpdateSnsEventMutation = () => {
  return useMutation<
    unknown, // TData
    ApiError<ApiErrorBody>, // TError
    UpdateSnsEventAssistantRequestDto // TMutateVariables
  >({
    mutationFn: ({ snsEventId, title }) => UpdateSnsEvent({ snsEventId, title }),
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        notFound();
      }
    },
  });
};

export default useUpdateSnsEventMutation;
