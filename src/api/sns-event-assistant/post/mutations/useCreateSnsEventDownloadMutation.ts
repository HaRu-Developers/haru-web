'use client';

import { notFound, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import {
  GetSnsEventAssistantListDownloadRequestDto,
  GetSnsEventAssistantListDownloadResponseDto,
} from '@api/sns-event-assistant/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';

import { ApiError } from '@common/errors/ApiError';

import { CreateSnsEventDownload } from '../apis/create-sns-event-list-download';

/**
 * SNS 이벤트 목록 다운로드 요청을 위한 TanStack Query 뮤테이션 훅입니다.
 * 훅의 `mutate` 함수는 GetSnsEventAssistantListDownloadRequestDto 타입의 객체를 전달받습니다.
 * @param {string} mutationVariables.snsEventId - 다운로드할 SNS 이벤트의 고유 ID입니다.
 * @param {DownloadFormat} mutationVariables.format - 다운로드할 파일의 형식입니다.
 * @param {SnsEventAssistantListType} mutationVariables.listType - 다운로드할 목록의 타입입니다.
 */
const useCreateSnsEventDownloadMutation = () => {
  const router = useRouter();
  return useMutation<
    { result: GetSnsEventAssistantListDownloadResponseDto }, // TData
    ApiError<ApiErrorBody>, // TError
    GetSnsEventAssistantListDownloadRequestDto // TMutateVariables
  >({
    mutationFn: ({ snsEventId, format, listType }) => {
      console.log(snsEventId, format, listType);
      return CreateSnsEventDownload({ snsEventId, format, listType });
    },
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      if (error.code === API_ERROR_CODES.SNS_EVENT.NOT_FOUND) {
        notFound();
      }
    },
  });
};

export default useCreateSnsEventDownloadMutation;
