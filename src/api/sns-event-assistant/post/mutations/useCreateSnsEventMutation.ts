import { notFound } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import {
  CreateSnsEventAssistantRequestDto,
  CreateSnsEventAssistantResponseDto,
} from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from '@common/errors/ApiError';

import { CreateSnsEvent } from '../apis/create-sns-event';

const useCreateSnsEventMutation = () => {
  return useMutation<
    { result: CreateSnsEventAssistantResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    CreateSnsEventAssistantRequestDto // TMutateVariables
  >({
    mutationFn: ({ workspaceId, title, snsEventLink, condition }) =>
      CreateSnsEvent({ workspaceId, title, snsEventLink, condition }),
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        notFound();
      }
    },
  });
};

export default useCreateSnsEventMutation;
