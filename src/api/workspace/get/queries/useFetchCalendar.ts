import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { DocumentList } from '@common/components/etc/calendar/types/calendar.common.types';

import { fetchCalendar } from '../apis/fetchCalendar';

/**
 * 캘린더에서 워크 스페이스의 캘린더 조회의 파일을 가져오는 훅
 */
const useFetchCalendar = (workspaceId: string, start: Date, end: Date) => {
  // Hydrate된 데이터가 있어 추가 네트워크 요청 없이 바로 캐시 데이터 사용
  return useAfterQuery<
    { result: { documentList: DocumentList[] } }, // TData
    ApiError<ApiErrorBody>, // TError
    DocumentList[] // TExtra
  >({
    queryKey: queryKeys.workspaces.calendar(workspaceId, start, end).queryKey,
    queryFn: () => {
      return fetchCalendar({ workspaceId, start, end });
    },
    enabled: !!workspaceId,
    retry: false,
    extra: (queryResult) => queryResult.data?.result?.documentList ?? [],
  });
};

export default useFetchCalendar;
