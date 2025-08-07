import { HydrationBoundary } from '@tanstack/react-query';

import queryKeys from '@common/constants/query-key.constants';

import { getDehydratedState } from '@common/utils/dehydrate';

import { TeamMoodTrackerPageProps } from '@/api/team-mood-tracker/apis.types';
import { viewReportResponse } from '@/api/team-mood-tracker/get/apis/view-report-response';
import { viewSurveyResponse } from '@/api/team-mood-tracker/get/apis/view-survey-response';

import TeamMoodTrackerDetailPage from '../../../../../../features/team-mood-tracker/components/TeamMoodTrackerDetailPage/TeamMoodTrackerDetailPage.client';

const TeamMoodTrackerPage = async ({ params }: TeamMoodTrackerPageProps) => {
  // await를 사용해 params Promise가 resolve 되기를 기다립니다.
  const { moodTrackerHashedId } = await params;

  // getDehydratedState에서 dehydratedState 속성만 추출합니다.
  const { dehydratedState } = await getDehydratedState({
    prefetch: async (qc) => {
      await Promise.all([
        qc.prefetchQuery({
          ...queryKeys.moodTracker.detail(moodTrackerHashedId),
          queryFn: () => viewSurveyResponse({ moodTrackerHashedId }),
        }),
        qc.prefetchQuery({
          ...queryKeys.moodTracker.report(moodTrackerHashedId),
          queryFn: () => viewReportResponse({ moodTrackerHashedId }),
        }),
      ]);
    },
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <TeamMoodTrackerDetailPage />
    </HydrationBoundary>
  );
};

export default TeamMoodTrackerPage;
