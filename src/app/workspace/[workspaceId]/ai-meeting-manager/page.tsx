import { HydrationBoundary } from '@tanstack/react-query';

import fetchMeetingMinutesList from '@api/meeting/get/apis/fetchMeetingMinutesList';

import { FileType } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import queryKeys from '@common/constants/query-key.constants';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';
import { getDehydratedState } from '@common/utils/dehydrate';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileAiMeetingManagerWrapper from '@features/ai-meeting-manager/components/ListFileAiMeetingManagerWrapper/ListFileAiMeetingManagerWrapper.client';

const AiMeetingManagerDefaultPage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;

  const { dehydratedState } = await getDehydratedState({
    prefetch: async (qc) => {
      await qc.prefetchQuery({
        queryKey: queryKeys.meetings.list(workspaceId).queryKey,
        queryFn: () => fetchMeetingMinutesList({ workspaceId }),
      });
    },
  });

  return (
    <section>
      <GnbTop section={GnbSection.AI_MEETING_MANAGER} />
      <div className="assistant-wrapper">
        {/* cta 부분 */}
        {getCtaDescription(FileType.AI_MEETING_MANAGER)}
        <TextCtaWrapper fileType={FileType.AI_MEETING_MANAGER} workspaceId={workspaceId} />
        {/* 리스트 부분 */}
        {getListTitle(FileType.AI_MEETING_MANAGER)}
        <ListHeader fileType={FileType.AI_MEETING_MANAGER} />
        <HydrationBoundary state={dehydratedState}>
          <ListFileAiMeetingManagerWrapper workspaceId={workspaceId} />
        </HydrationBoundary>
      </div>
    </section>
  );
};

export default AiMeetingManagerDefaultPage;
