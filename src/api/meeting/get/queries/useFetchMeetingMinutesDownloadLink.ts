import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { MeetingMinutesDownloadLinkResponseDTO } from '../../api.types';
import fetchMeetingMinutesDownloadLink from '../apis/fetchMeetingMinutesDownloadLink';

/**
 * 특정 회의록 다운로드 링크 가져오는 훅
 */
const useFetchMeetingMinutesDownloadLink = (meetingId: string) => {
  return useAfterQuery<
    { result: MeetingMinutesDownloadLinkResponseDTO }, // TData
    ApiError<ApiErrorBody>, // TError
    string //TExtra
  >({
    queryKey: queryKeys.meetings.editTitle(meetingId).queryKey,
    queryFn: () => fetchMeetingMinutesDownloadLink({ meetingId }),
    enabled: !!meetingId,
    retry: false,
    extra: (qr) => qr.data?.result.downloadLink ?? '',
  });
};

export default useFetchMeetingMinutesDownloadLink;
