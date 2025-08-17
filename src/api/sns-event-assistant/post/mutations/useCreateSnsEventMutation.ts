'use client';

import { notFound, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  CreateSnsEventAssistantRequestDto,
  CreateSnsEventAssistantResponseDto,
} from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';
import { ToastType } from '@common/types/toast.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useSnsEventAssistantActions } from '@common/hooks/stores/useSnsEventAssistantStore';
import { useToastActions } from '@common/hooks/stores/useToastStore';

import { CreateSnsEvent } from '../apis/create-sns-event';

const useCreateSnsEventMutation = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setNewEventInit } = useSnsEventAssistantActions();
  const { addToast } = useToastActions();
  return useMutation<
    { result: CreateSnsEventAssistantResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    CreateSnsEventAssistantRequestDto // TMutateVariables
  >({
    mutationFn: ({ workspaceId, title, snsEventLink, snsCondition }) =>
      CreateSnsEvent({ workspaceId, title, snsEventLink, snsCondition }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.snsEventAssistant.list(workspaceId).queryKey,
      });
      const snsEventId = data?.result?.snsEventId;
      router.push(ROUTES.SNS_EVENT_ASSISTANT.DETAIL(workspaceId, snsEventId));
      setNewEventInit();
    },
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        notFound();
      } else {
        router.back();
        if (error.code === API_ERROR_CODES.SNS_EVENT.LINK_NOT_FOUND) {
          addToast({
            text: '올바른 링크를 입력해주세요.',
            type: ToastType.ERROR,
          });
        }
      }
    },
  });
};

export default useCreateSnsEventMutation;
