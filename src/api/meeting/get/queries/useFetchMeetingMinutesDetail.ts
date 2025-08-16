import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { ApiErrorBody } from '@common/types/api.common.types';

import { API_ERROR_CODES } from '@common/constants/api-error-codes.constants';
import queryKeys from '@common/constants/query-key.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { MeetingMinutesDetail } from '../../api.types';
import fetchMeetingMinutesDetail from '../apis/fetchMeetingMinutesDetail';

/**
 * 특정 회의록 디테일 가져오는 훅
 */
const useFetchMeetingMinutesDetail = (meetingId: string) => {
  const router = useRouter();

  const handleError = useCallback(
    (error: ApiError<ApiErrorBody>) => {
      if (error.code === API_ERROR_CODES.MEETING.NOT_FOUND) {
        router.replace(ROUTES.NOT_FOUND); // notFound() 대신 클라 라우팅
      }
    },
    [router],
  );

  return useAfterQuery<
    { result: MeetingMinutesDetail }, // TData
    ApiError<ApiErrorBody>, // TError
    MeetingMinutesDetail | undefined // TExtra
  >({
    queryKey: queryKeys.meetings.detail(meetingId).queryKey,
    queryFn: () => fetchMeetingMinutesDetail({ meetingId }),
    enabled: !!meetingId,
    retry: false,
    onError: handleError,
    extra: (qr) => qr.data?.result,
  });
};

export default useFetchMeetingMinutesDetail;
