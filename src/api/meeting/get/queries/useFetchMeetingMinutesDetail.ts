'use client';

import { useCallback } from 'react';

import { notFound } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';
import { handleMeetingError } from '@common/errors/meeting-error.utils';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';
import { useToastActions } from '@common/hooks/stores/useToastStore';

import { MeetingMinutesDetail } from '../../api.types';
import fetchMeetingMinutesDetail from '../apis/fetchMeetingMinutesDetail';

/**
 * 특정 회의록 디테일 가져오는 훅
 */
const useFetchMeetingMinutesDetail = (meetingId: string) => {
  const { addToast } = useToastActions();

  const handleError = useCallback((error: ApiError<ApiErrorBody>) => {
    handleMeetingError(error, { addToast });
  }, []);

  return useAfterQuery<
    { result: MeetingMinutesDetail }, // TData
    ApiError<ApiErrorBody>, // TError
    MeetingMinutesDetail | undefined // TExtra
  >({
    queryKey: queryKeys.meetings.meetingMinutesDetail(meetingId).queryKey,
    queryFn: () => fetchMeetingMinutesDetail({ meetingId }),
    enabled: !!meetingId,
    retry: false,
    onError: handleError,
    extra: (qr) => qr.data?.result,
    throwOnError: true,
  });
};

export default useFetchMeetingMinutesDetail;
