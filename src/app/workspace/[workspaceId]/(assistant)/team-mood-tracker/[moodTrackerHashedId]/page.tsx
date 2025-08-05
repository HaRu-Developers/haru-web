'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { GnbSection } from '@common/types/gnbs.types';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import { TeamMoodTrackerToastType } from '@features/team-mood-tracker/types/TeamMoodTrackerToastStore.types';

import { filterSafeResponseList } from '@features/team-mood-tracker/utils/safe-response-list.utils';

import { useOnboardingState } from '@features/on-boarding/hooks/stores/useOnBoardingStore';
import { useViewReportResponse } from '@features/team-mood-tracker/hooks/mutations/useViewReportResponse';
import { useViewSurveyResponse } from '@features/team-mood-tracker/hooks/mutations/useViewSurveyResponse';
import { useTeamMoodToastActions } from '@features/team-mood-tracker/hooks/stores/useTeamMoodTrackerToastStore';

import TeamMoodAnswerChartSection from '@features/team-mood-tracker/components/TeamMoodAnswerChartSection/TeamMoodAnswerChartSection.client';
import TeamMoodReportContentSection from '@features/team-mood-tracker/components/TeamMoodReportContentSection/TeamMoodReportContentSection.client';
import TeamMoodReportNoneContentSection from '@features/team-mood-tracker/components/TeamMoodReportNoneContentSection/TeamMoodReportNoneContentSection.server';
import TeamMoodToast from '@features/team-mood-tracker/components/TeamMoodToast/TeamMoodToast.client';
import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';
import TeamMoodReportTab from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTab.types';

const TeamMoodTrackerDetailPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{
    workspaceId: string;
    moodTrackerHashedId: string;
  }>();

  const router = useRouter();

  const workspaceId = params.workspaceId;
  const moodTrackerHashedId = params.moodTrackerHashedId;

  const { showCopyToast } = useTeamMoodToastActions();

  const currentTab =
    (searchParams.get('moodTab') as TeamMoodReportTabType) ??
    TeamMoodReportTabType.TEAM_MOOD_REPORT;

  const { data: surveyResponse, isLoading: isSurveyLoading } =
    useViewSurveyResponse(moodTrackerHashedId);
  const { data: reportResponse, isLoading: isReportLoading } =
    useViewReportResponse(moodTrackerHashedId);

  const isLoading = isSurveyLoading || isReportLoading;
  const displayData = reportResponse || surveyResponse;
  const safeResponseList = filterSafeResponseList(surveyResponse?.responseList);

  const handleCopyClick = async () => {
    const reportContent = reportResponse?.report;

    if (!reportContent || reportContent.trim() === '') {
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
      return;
    }

    try {
      await navigator.clipboard.writeText(reportContent);
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_SUCCESS });
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
    }
  };

  const handleDownloadClick = () => {
    router.push(`/workspace/${workspaceId}/team-mood-tracker/${moodTrackerHashedId}/download`);
  };

  if (isLoading) {
    return <TeamMoodTrackerPageSkeleton />;
  }

  if (
    (currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && !surveyResponse) ||
    (currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT && !reportResponse)
  ) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  if (!displayData) return null;

  return (
    <>
      <div className="relative flex flex-col">
        <GnbTop section={GnbSection.CUSTOM} title={displayData.title} />
        <div className="top-100pxr absolute right-0 left-0 z-100 flex justify-center">
          <TeamMoodToast />
        </div>
        <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
          <h1 className="text-t1-sb mb-14pxr">{displayData.title}</h1>
          <div className="text-cap2-md">
            <FileCreatedInfo
              name={displayData.creatorName}
              userId={displayData.creatorId}
              dateTime={displayData.updatedAt}
            />
          </div>
        </div>
        <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
          <div className="w-668pxr mx-auto">
            <TeamMoodReportTab
              current={currentTab}
              counts={{
                [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
                [TeamMoodReportTabType.ANSWER_SUMMARY]: displayData.respondentsNum,
                [TeamMoodReportTabType.SURVEY_LIST]: 0,
              }}
              handleCopyClick={handleCopyClick}
              handleDownloadClick={handleDownloadClick}
            />
          </div>
        </div>

        {currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT &&
          (reportResponse?.report && reportResponse?.report.trim() !== '' ? (
            <TeamMoodReportContentSection
              suggestionList={reportResponse.suggestionList}
              report={reportResponse.report}
            />
          ) : (
            <TeamMoodReportNoneContentSection />
          ))}

        {currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && surveyResponse && (
          <TeamMoodAnswerChartSection responses={safeResponseList} />
        )}
      </div>
    </>
  );
};

export default TeamMoodTrackerDetailPage;
