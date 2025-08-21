import { useCallback, useMemo, useRef } from 'react';

import { ApiErrorBody } from '@common/types/api.common.types';
import { DownloadFormat } from '@common/types/download.enum.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { MeetingMinutesDownloadLinkResponseDTO } from '../../api.types';
import fetchMeetingMinutesDownloadLink from '../apis/fetchMeetingMinutesDownloadLink';

/**
 * 특정 회의록 다운로드 링크 가져오는 훅
 */
const useFetchMeetingMinutesDownloadLink = (meetingId: string) => {
  const fmtRef = useRef<DownloadFormat | null>(null);

  // 형식을 키에 넣지 말고 'DYNAMIC' 같은 센티널로 고정
  const key = useMemo(
    () =>
      queryKeys.meetings.downloadLink(meetingId, 'DYNAMIC' as unknown as DownloadFormat).queryKey,
    [meetingId],
  );

  const query = useAfterQuery<
    { result: MeetingMinutesDownloadLinkResponseDTO }, // TData
    ApiError<ApiErrorBody> // TError
  >({
    queryKey: key,
    queryFn: () => {
      // enabled:false로 마운트 시점에는 실행되지 않고,
      // refetch() 호출할 때만 이 queryFn이 실행됨
      const fmt = fmtRef.current;

      if (!meetingId || !fmt) {
        console.log(meetingId, fmt);
        throw new Error('getDownloadLink error: Invalid params for download link');
      }
      return fetchMeetingMinutesDownloadLink({ meetingId, format: fmt });
    },
    enabled: false, // 자동 실행 X → refetch로만 호출
    retry: false,
  });

  const getLink = useCallback(
    async (format: DownloadFormat) => {
      if (!meetingId) throw new Error('getDownloadLink: Invalid meetingId');
      fmtRef.current = format;
      const { data, error } = await query.refetch();
      if (error) throw error; // ← 페이지 onError로 전파
      const link = data?.result?.downloadLink ?? '';
      if (!link) throw new Error('getDownloadLink: Empty download link');
      return link;
    },
    [meetingId, query],
  );

  return { getLink };
};

export default useFetchMeetingMinutesDownloadLink;
