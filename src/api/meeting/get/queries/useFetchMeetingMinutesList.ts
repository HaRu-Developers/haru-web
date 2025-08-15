import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { MeetingMinutesInfo } from '../../api.types';
import fetchMeetingMinutesList from '../apis/fetchMeetingMinutesList';

/**
 * ai meeting 회의록 리스트 가져오는 훅
 */
const useFetchMeetingMinutesList = (workspaceId: string) => {
  return useAfterQuery<
    { result: MeetingMinutesInfo[] }, // TData
    ApiError<ApiErrorBody>, // TError
    MeetingMinutesInfo[] // TExtra
  >({
    queryKey: queryKeys.meetings.list(workspaceId).queryKey,
    queryFn: () => fetchMeetingMinutesList({ workspaceId }),
    enabled: !!workspaceId,
    retry: false,
    extra: (queryResult) => (queryResult.data?.result ?? []) as MeetingMinutesInfo[],
  });
};

export default useFetchMeetingMinutesList;
