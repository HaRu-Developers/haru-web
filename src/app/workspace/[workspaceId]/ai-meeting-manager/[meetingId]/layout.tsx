import { HydrationBoundary } from '@tanstack/react-query';

import { FetchMeetingMinutesDetailResponseDto } from '@api/meeting/api.types';
import fetchMeetingMinutesDetail from '@api/meeting/get/apis/fetchMeetingMinutesDetail';

import { BaseResponseDto } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { getDehydratedState } from '@common/utils/dehydrate';

import GnbTopTitle from '@features/ai-meeting-manager/components/GnbTopTitle/GnbTopTitle.client';

const AiMeetingLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { meetingId: string };
}) => {
  const { meetingId } = await params;

  // 서버에서 meeting detail을 ensureQueryData로 가져오며, 성공 시 캐시에 저장 + 이 컴포넌트에서 즉시 사용
  let title = '';

  const { dehydratedState } = await getDehydratedState({
    prefetch: async (qc) => {
      const res = await qc.ensureQueryData<BaseResponseDto<FetchMeetingMinutesDetailResponseDto>>({
        queryKey: queryKeys.meetings.meetingMinutesDetail(meetingId).queryKey,
        queryFn: () => fetchMeetingMinutesDetail({ meetingId }),
      });
      title = res.result.title;
    },
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <GnbTopTitle meetingId={meetingId} title={title} />
      <main className="h-[calc(100%-var(--gnb-top-height))]">{children}</main>
    </HydrationBoundary>
  );
};

export default AiMeetingLayout;
