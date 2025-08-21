import { useCallback } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiDocument } from '@api/workspace/api.types';

import { ApiErrorBody } from '@common/types/api.common.types';
import { ToastType } from '@common/types/toast.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import { ModifyMoodTrackerTitleRequestDto, SurveyBaseInfoResponseDto } from '../../apis.types';
import { ModifyMoodTrackerTitle } from '../apis/modify-title';

/**
 * 분위기 트래커의 제목을 수정하기 위한 커스텀 Mutation 훅입니다.
 * * '낙관적 업데이트(Optimistic Update)' 패턴을 사용합니다.
 * 사용자가 제목 수정을 시도하면, 서버 응답을 기다리지 않고 UI를 즉시 업데이트하여 매우 빠른 사용자 경험을 제공합니다.
 *  @description
 * 이 훅의 낙관적 업데이트는 'surveyResponse' 데이터 (queryKey: moodTracker.detail)를
 * 주요 데이터 소스(Source of Truth)로 삼아 동작합니다.
 * * 1. onMutate에서 surveyResponse 캐시를 즉시 수정하여 UI에 반영합니다.
 * 2. onError에서 문제가 생기면 surveyResponse 캐시를 원상 복구합니다.
 * 3. onSettled에서 surveyResponse와 reportResponse를 포함한 모든 관련 데이터를
 * 서버와 최종 동기화하여 데이터 정합성을 보장합니다.
 */

export const useModifyMoodTrackerTitleMutation = () => {
  const queryClient = useQueryClient();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addToast } = useToastActions();

  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    if (error.code === API_ERROR_CODES.MOOD_TRACKER.MODIFY_NOT_ALLOWED) {
      addToast({
        text: '수정할 권한이 없습니다.',
        type: ToastType.ERROR,
      });
      return;
    }
    addToast({
      text: `제목 수정 중 오류가 발생했습니다: ${error.message}`,
      type: ToastType.ERROR,
    });
    console.error('API Error:', error.message);
  }, []);

  return useMutation({
    mutationFn: (data: ModifyMoodTrackerTitleRequestDto) => ModifyMoodTrackerTitle(data),

    onMutate: async ({ moodTrackerHashedId, title: newTitle }) => {
      // 낙관적 업데이트의 기준이 되는 surveyResponse 데이터의 쿼리 키를 가져옵니다.
      const surveyBasicInfoQueryKey = queryKeys.moodTracker.surveyBasicInfo(moodTrackerHashedId);
      const recentDocsQueryKey = queryKeys.workspaces.recentDocuments(workspaceId);

      // 1. 관련된 모든 쿼리를 취소합니다.
      await queryClient.cancelQueries({ queryKey: surveyBasicInfoQueryKey.queryKey });
      await queryClient.cancelQueries({ queryKey: recentDocsQueryKey.queryKey });

      // 2. 롤백을 대비하여, 현재 캐시에 있는 'surveyResponse' 데이터를 백업합니다.
      const previousBasicInfo = queryClient.getQueryData<SurveyBaseInfoResponseDto>(
        surveyBasicInfoQueryKey.queryKey,
      );
      const previousRecentDocs = queryClient.getQueryData<{ result: { documents: ApiDocument[] } }>(
        recentDocsQueryKey.queryKey,
      );

      // 3. 'surveyBasicInfo' 캐시를 새로운 제목으로 즉시 업데이트합니다.
      if (previousBasicInfo) {
        queryClient.setQueryData<SurveyBaseInfoResponseDto>(surveyBasicInfoQueryKey.queryKey, {
          ...previousBasicInfo,
          title: newTitle,
        });
      }

      if (previousRecentDocs) {
        const newDocuments = previousRecentDocs.result.documents.map((doc) =>
          doc.documentId === moodTrackerHashedId ? { ...doc, title: newTitle } : doc,
        );
        queryClient.setQueryData(recentDocsQueryKey.queryKey, {
          ...previousRecentDocs,
          result: {
            ...previousRecentDocs.result,
            documents: newDocuments,
          },
        });
      }

      // 4. 백업해 둔 이전 데이터를 context에 담아 onError와 onSettled에 전달합니다.
      return {
        previousBasicInfo,
        previousRecentDocs,
        surveyBasicInfoQueryKey: surveyBasicInfoQueryKey.queryKey,
        recentDocsQueryKey: recentDocsQueryKey.queryKey,
      };
    },

    onError: (error: Error, variables, context) => {
      // 5. onMutate에서 백업해 둔 'previousSurveyData'를 사용하여 캐시를 원상 복구합니다.
      if (context?.previousBasicInfo) {
        queryClient.setQueryData(context.surveyBasicInfoQueryKey, context.previousBasicInfo);
      }
      // GnbLeft RecentData
      if (context?.previousRecentDocs) {
        queryClient.setQueryData(context.recentDocsQueryKey, context.previousRecentDocs);
      }

      if (error instanceof ApiError) {
        handleError(error);
      } else {
        addToast({
          text: '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          type: ToastType.ERROR,
        });
        console.error('알 수 없는 에러 발생:', error);
      }
    },

    /**
     * Mutation이 성공하든 실패하든, 완료되면 항상 호출됩니다.
     * 클라이언트의 데이터를 서버의 최신 상태와 최종적으로 동기화합니다.
     *
     * 해당 훅이 사용되는 페이지에서 낙관적 업데이트를 극대화 하기 위해 주석처리합니다.
     */

    onSettled: (data, error, variables) => {
      // GNB Left reload - 최신화
      queryClient.invalidateQueries(queryKeys.workspaces.recentDocuments(workspaceId));
    },
  });
};
