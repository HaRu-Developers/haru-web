import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { MeetingMinutesDetail } from '../../api.types';
import fetchMeetingMinutesDetail from '../apis/fetchMeetingMinutesDetail';

/**
 * 특정 회의록 디테일 가져오는 훅
 */
const useFetchMeetingMinutesDetail = (meetingId: string) => {
  return useAfterQuery<
    { result: MeetingMinutesDetail }, // TData
    ApiError<ApiErrorBody>, // TError
    MeetingMinutesDetail | undefined // TExtra
  >({
    queryKey: queryKeys.meetings.detail(meetingId).queryKey,
    queryFn: () => fetchMeetingMinutesDetail({ meetingId }),
    enabled: !!meetingId,
    retry: false,
    extra: (qr) => qr.data?.result,
  });
};

export default useFetchMeetingMinutesDetail;
