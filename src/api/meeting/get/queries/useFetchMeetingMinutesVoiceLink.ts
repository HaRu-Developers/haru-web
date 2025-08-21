import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { MeetingMinutesVoiceLinkResponseDTO } from '../../api.types';
import fetchMeetingMinutesVoiceLink from '../apis/fetchMeetingMinutesVoiceLink';

/**
 * 특정 회의록 다운로드 링크 가져오는 훅
 */
const useFetchMeetingMinutesVoiceLink = (meetingId: string, opts: { enabled?: boolean } = {}) => {
  return useAfterQuery<
    { result: MeetingMinutesVoiceLinkResponseDTO }, // TData
    ApiError<ApiErrorBody>, // TError
    string //TExtra
  >({
    queryKey: queryKeys.meetings.voiceLink(meetingId).queryKey,
    queryFn: () => fetchMeetingMinutesVoiceLink({ meetingId }),
    enabled: (opts.enabled ?? true) && !!meetingId,
    retry: false,
    extra: (qr) => qr.data?.result.voiceLink ?? '',
  });
};

export default useFetchMeetingMinutesVoiceLink;
